/**
 * จับคู่ crop ที่ตรวจจับได้กับชื่อไอเทม / มอนสเตอร์ / NPC แล้วคัดลอกไปที่ web/public/icons
 *
 *   node build-assets.mjs <manifest> <cropsDir> <crops2Dir> <webPublicDir> <srcImagesDir>
 *
 * <manifest> คือชื่อไฟล์ใน tools/manifests เช่น ep0, ep1
 * รูปแบบ ref: "<sourceBase>#<candidateIndex>" หรือ "2:<sourceBase>#<index>" (ผลจากรอบที่สอง)
 *
 * ไอคอนของทุกตอนอยู่โฟลเดอร์เดียวกัน จึงเขียนทับเฉพาะไฟล์ของตอนนั้น ไม่ล้างทั้งโฟลเดอร์
 */
import { readFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const [MANIFEST, CROPS, CROPS2, PUBLIC, SRC] = process.argv.slice(2);

const manifestPath = path.join(
  path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")),
  "manifests",
  `${MANIFEST}.mjs`
);
const { ITEMS, MONSTERS, NPCS, MANUAL = {}, ADJUST = {} } = await import(
  pathToFileURL(manifestPath).href
);

const metaCache = new Map();
async function resolve(ref) {
  const useSecond = ref.startsWith("2:");
  const body = useSecond ? ref.slice(2) : ref;
  const [base, idxRaw] = body.split("#");
  const root = useSecond ? CROPS2 : CROPS;
  const key = `${root}|${base}`;
  if (!metaCache.has(key)) {
    metaCache.set(
      key,
      JSON.parse(await readFile(path.join(root, base, "meta.json"), "utf8"))
    );
  }
  const entry = metaCache.get(key).find((m) => m.index === Number(idxRaw));
  if (!entry) throw new Error(`ไม่พบ candidate ${ref}`);
  return path.join(root, base, entry.file);
}

async function emit(group, table) {
  const dir = path.join(PUBLIC, "icons", group);
  await mkdir(dir, { recursive: true });

  for (const [name, ref] of Object.entries(table)) {
    await copyFile(await resolve(ref), path.join(dir, `${name}.png`));
  }

  for (const [name, r] of Object.entries(MANUAL[group] ?? {})) {
    await sharp(path.join(SRC, r.file))
      .extract({ left: r.left, top: r.top, width: r.width, height: r.height })
      .png()
      .toFile(path.join(dir, `${name}.png`));
  }

  for (const [key, r] of Object.entries(ADJUST)) {
    const [g, name] = key.split("/");
    if (g !== group) continue;
    const target = path.join(dir, `${name}.png`);
    const buf = await sharp(target).extract(r).png().toBuffer();
    await sharp(buf).toFile(target);
  }

  return Object.keys(table).length + Object.keys(MANUAL[group] ?? {}).length;
}

console.log(
  JSON.stringify({
    manifest: MANIFEST,
    items: await emit("items", ITEMS),
    monsters: await emit("monsters", MONSTERS),
    npcs: await emit("npcs", NPCS),
  })
);
