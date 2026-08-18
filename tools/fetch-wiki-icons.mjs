/**
 * ดึงไอคอน NPC / ไอเทม / มอนสเตอร์ / มินิแมป จากวิกิ ggftw (ผ่าน wikimirror.lifeto.co)
 *
 *   node tools/fetch-wiki-icons.mjs --dry    ดูว่าจะเปลี่ยนอะไรบ้าง ไม่เขียนไฟล์
 *   node tools/fetch-wiki-icons.mjs          เขียนไฟล์จริง + manifest + src/data/npcMaps.ts
 *
 * ทำไมต้องดึง: ไอคอนชุดเดิมครอปจากภาพถ่ายหน้าจอที่ผ่าน JPEG มาแล้ว ขอบเบลอและมีฝ้าติดมา
 * ของในวิกิดึงจากตัวเกมตรง ๆ มี alpha channel ขอบคมทุกพิกเซล
 *
 * เลือกไฟล์ยังไงเมื่อชื่อเดียวมีหลายภาพ
 *   npcs     สไปรต์ในเกม (.gif) ตัวใหญ่สุด — ไม่เอาภาพอาร์ต เพราะต้องให้จำหน้าในเกมได้
 *   monsters ภาพอาร์ต (.png) ตัวใหญ่สุด — สไปรต์มอนในเกมเล็กเกินจะดูออก
 *   items    เอาต่อเมื่อของวิกิใหญ่กว่าของเดิม ถ้าวิกิมีแค่ไอคอน 25x25 ในเกมให้คงของเดิมไว้
 *
 * มินิแมป: หน้าเควสวางภาพแมพคู่กับ Circle.gif ที่ตำแหน่ง absolute เพื่อชี้จุดที่ NPC ยืน
 * สคริปต์อ่านพิกัดนั้นมาแปะวงกลมทับแมพให้เหมือนเดิม แล้วเก็บเป็นไฟล์ต่อ NPC หนึ่งไฟล์
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MIRROR = "https://wikimirror.lifeto.co";
const WIKI = `${MIRROR}/wiki.ggftw.com/trickster`;
const ASSETS = `${MIRROR}/asset.103.ggftw.net/wiki/to-w/images`;
const ROOT = path.join(import.meta.dirname, "..");
const ICONS = path.join(ROOT, "public/icons");
const MAPS = path.join(ICONS, "maps");
const MANIFEST = path.join(ROOT, "tools/manifests/wiki-icons.json");
const NPC_MAPS_TS = path.join(ROOT, "src/data/npcMaps.ts");

const DRY = process.argv.includes("--dry");
const INDEX_PAGES = ["Episode_0_Quests", "Episode_1_Quests"];

const ALIASES = {
  "baby-carrot": "Carrot",
  "nates-certification": "Nate's Certification",
  "directors-letter": "Director's Letter",
  "jennys-photo-b": "Jenny's Photo B",
  "nefertiti-portrait": "Nefertiti's Portrait",
  "mermaid-babe-portrait": "Mermaid Babe's Portrait",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/^image:/, "")
    .replace(/\.(gif|png|jpg)$/, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const pageName = (name) =>
  (ALIASES[name] ?? name.replace(/-/g, " "))
    .split(/\s+/)
    .map((w) => (/^[a-z]/.test(w) ? w[0].toUpperCase() + w.slice(1) : w))
    .join("_");

const cache = new Map();
async function grab(file) {
  if (!cache.has(file)) {
    const res = await fetch(`${ASSETS}/${file}`);
    cache.set(file, res.ok ? Buffer.from(await res.arrayBuffer()) : null);
    await sleep(150);
  }
  return cache.get(file);
}

async function fetchText(url) {
  const res = await fetch(url);
  return res.ok ? res.text() : null;
}

function collect(html, into) {
  for (const m of html.matchAll(/<img[^>]*>/g)) {
    const tag = m[0];
    const alt = tag.match(/alt="([^"]*)"/)?.[1];
    const src = tag.match(/src="([^"]*)"/)?.[1];
    if (!alt || !src || !src.includes("to-w/images")) continue;
    const file = src.replace(/^.*to-w\/images\//, "");
    const cand = {
      file,
      ext: path.extname(file).toLowerCase(),
      area:
        Number(tag.match(/width="(\d+)"/)?.[1] ?? 0) * Number(tag.match(/height="(\d+)"/)?.[1] ?? 0),
    };
    const key = slug(alt);
    const list = into.get(key) ?? [];
    if (!list.some((c) => c.file === cand.file)) list.push(cand);
    into.set(key, list);
  }
}

/** หน้าเควสวาง <td> รูป NPC ติดกับ <td> รูปแมพที่มี Circle.gif ปักหมุดอยู่ */
const MAP_ROW =
  /alt="Image:[^"]+\.gif"[^>]*src="([^"]+\.gif)"[\s\S]{0,700}?alt="Image:[^"]+\.png"[^>]*src="([^"]+\.png)"[\s\S]{0,500}?left:\s*(-?\d+)px;\s*top:\s*(-?\d+)px/g;

/** src ในหน้าเป็น path เต็ม ตัดให้เหลือ <a>/<ab>/<file> แบบเดียวกับที่ใช้เรียก asset */
const assetPath = (src) => src.replace(/^.*to-w\/images\//, "");

function collectMaps(html, into) {
  for (const m of html.matchAll(MAP_ROW)) {
    const [, npcSrc, mapSrc, left, top] = m;
    const key = path.basename(assetPath(npcSrc), ".gif");
    if (!into.has(key)) {
      into.set(key, { mapPath: assetPath(mapSrc), left: Number(left), top: Number(top) });
    }
  }
}

const index = new Map();
const npcMapRows = new Map();
for (const page of INDEX_PAGES) {
  const html = await fetchText(`${WIKI}/${page}.html`);
  if (!html) {
    console.warn(`เปิด ${page} ไม่ได้`);
    continue;
  }
  collect(html, index);
  collectMaps(html, npcMapRows);
  await sleep(300);
}
console.log(`หน้ารวม -> ${index.size} ชื่อ, จับคู่แมพได้ ${npcMapRows.size} NPC`);

const groups = ["npcs", "items", "monsters"];
const wanted = [];
for (const dir of groups) {
  for (const f of (await readdir(path.join(ICONS, dir))).filter((f) => f.endsWith(".png"))) {
    wanted.push({ dir, name: path.basename(f, ".png") });
  }
}

for (const { dir, name } of wanted) {
  const list = index.get(name);
  const needsOwnPage =
    !list ||
    (dir === "npcs" && !list.some((c) => c.ext === ".gif")) ||
    (dir === "monsters" && !list.some((c) => c.ext === ".png"));
  if (!needsOwnPage) continue;
  const html = await fetchText(`${WIKI}/${pageName(name)}.html`);
  await sleep(250);
  if (html) {
    collect(html, index);
    collectMaps(html, npcMapRows);
  }
}

function pick(list, dir) {
  const biggest = (xs) => xs.slice().sort((a, b) => b.area - a.area)[0];
  if (dir === "npcs") {
    const gifs = list.filter((c) => c.ext === ".gif");
    return biggest(gifs.length ? gifs : list);
  }
  if (dir === "monsters") {
    const pngs = list.filter((c) => c.ext === ".png");
    return biggest(pngs.length ? pngs : list);
  }
  return biggest(list);
}

const changed = [];
const kept = [];
const manifest = {};
const npcToMap = {};

for (const { dir, name } of wanted) {
  const target = path.join(ICONS, dir, `${name}.png`);
  const list = index.get(name);
  if (!list) {
    kept.push(`${dir}/${name} (วิกิไม่มี)`);
    continue;
  }
  const choice = pick(list, dir);
  const raw = await grab(choice.file);
  if (!raw) {
    kept.push(`${dir}/${name} (โหลดไม่ได้)`);
    continue;
  }
  const png = await sharp(raw).png().toBuffer();
  const before = await sharp(target).metadata();
  const after = await sharp(png).metadata();

  // ไอเทมหลายชิ้นในวิกิมีแค่ไอคอน 25x25 ในเกม เล็กกว่าที่เราครอปไว้ ไม่ต้องทับ
  if (dir === "items" && after.width * after.height <= before.width * before.height) {
    kept.push(`${dir}/${name} (วิกิเล็กกว่า ${after.width}x${after.height})`);
    continue;
  }

  if (!DRY) await writeFile(target, png);
  manifest[`${dir}/${name}`] = choice.file;
  changed.push(`${dir}/${name}: ${before.width}x${before.height} -> ${after.width}x${after.height}`);

  // NPC ตัวไหนมีแมพคู่กัน แปะหมุดแล้วเก็บเป็นไฟล์แยก
  if (dir === "npcs") {
    const row = npcMapRows.get(path.basename(choice.file, ".gif"));
    if (!row) continue;
    const mapRaw = await grab(row.mapPath);
    const circleRaw = await grab("3/33/Circle.gif");
    if (!mapRaw || !circleRaw) continue;
    const meta = await sharp(mapRaw).metadata();
    const circle = await sharp(circleRaw).png().toBuffer();
    const cm = await sharp(circle).metadata();
    const composed = await sharp(mapRaw)
      .composite([
        {
          input: circle,
          left: Math.max(0, Math.min(row.left, meta.width - cm.width)),
          top: Math.max(0, Math.min(row.top, meta.height - cm.height)),
        },
      ])
      .png()
      .toBuffer();
    if (!DRY) {
      await mkdir(MAPS, { recursive: true });
      await writeFile(path.join(MAPS, `${name}.png`), composed);
    }
    npcToMap[name] = true;
    manifest[`maps/${name}`] = row.mapPath;
  }
}

if (!DRY) {
  await mkdir(path.dirname(MANIFEST), { recursive: true });
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  const names = Object.keys(npcToMap).sort();
  await writeFile(
    NPC_MAPS_TS,
    `/**
 * NPC ที่มีภาพมินิแมปปักหมุดจุดที่ยืน อยู่ที่ /icons/maps/<ชื่อ>.png
 *
 * ไฟล์นี้สร้างด้วย \`node tools/fetch-wiki-icons.mjs\` อย่าแก้มือ
 */
export const npcMaps = new Set<string>([
${names.map((n) => `  "${n}",`).join("\n")}
]);
`,
    "utf8"
  );
}

console.log(`\nเปลี่ยน ${changed.length} ไฟล์ / แมพ ${Object.keys(npcToMap).length} ไฟล์`);
changed.forEach((c) => console.log("  " + c));
console.log(`\nคงของเดิม ${kept.length} ไฟล์`);
kept.slice(0, 12).forEach((k) => console.log("  " + k));
if (kept.length > 12) console.log(`  … อีก ${kept.length - 12} ไฟล์`);
