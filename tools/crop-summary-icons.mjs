/**
 * ตัดไอคอนออกจากตารางสรุปของที่ต้องเก็บ (public/images/summary/<zone>.jpg)
 *
 *   node tools/crop-summary-icons.mjs <zone>          ตัดจริง ลง public/icons/summary/<zone>-NN.png
 *   node tools/crop-summary-icons.mjs <zone> --sheet  ทำ contact sheet ติดเลขไว้ดูว่าอันไหนคือเบอร์อะไร
 *   node tools/crop-summary-icons.mjs --all           ตัดทุกโซน
 *
 * ทำไมต้องมี: ตารางต้นฉบับมีแต่ไอคอน ไม่มีชื่อของ ของหลายชิ้นจึงไม่มีในคลังไอคอนของเว็บ
 * แทนที่จะปล่อยให้ขึ้นเครื่องหมายคำถาม ก็ตัดไอคอนจากตารางมาใช้ตรง ๆ คนอ่านจะได้เห็นว่าหน้าตายังไง
 *
 * วิธีทำงาน: คล้าย extract-icons.mjs แต่สร้าง mask จากพิกเซล "ที่มีสี" แทนหมึกทั้งหมด
 * เพราะตารางมีข้อความ "x3 (CAT ONLY)" ปนอยู่เต็มไปหมด และตัวอักษรเป็นสีดำ/เทาไร้สี
 * พอคัดด้วยความอิ่มสีตั้งแต่ต้น ตัวอักษรจึงหลุดออกไปเองโดยไม่ต้องมากรองทีหลัง
 * แล้ว dilate เพื่อรวมชิ้นส่วนของไอคอนเดียวกันที่ขาดจากกัน
 *
 * ข้อจำกัด: ไอคอนที่เกือบขาว (เช่นกระดาษ ขนนก) มีสีอ่อนเกินกว่าจะจับได้
 * ลดเกณฑ์ด้วย MIN_CHROMA=20 ได้ แต่จะเริ่มติดตัวอักษรมาด้วย
 *
 * เลขลำดับเรียงจากบนลงล่าง ซ้ายไปขวา และคงที่ทุกครั้งที่รัน
 * เพื่อให้อ้างใน src/data/summary.ts ได้โดยไม่เลื่อนเวลารันซ้ำ
 */
import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "public/images/summary");
const OUT_DIR = path.join(ROOT, "public/icons/summary");

const DILATE = Number(process.env.DILATE ?? 3);
const MIN_CHROMA = Number(process.env.MIN_CHROMA ?? 32); // ต่ำกว่านี้ถือว่าไร้สี = ตัวอักษร/เส้นตาราง
const MIN_SIDE = 9;       // ไอคอนเล็กสุดในตารางราว 14px
const MAX_SIDE = 130;     // สไปรต์มอนใหญ่สุดราว 90px
const MIN_AREA = 45;
const MIN_FILL = 0.1;
/** ก้อนที่อยู่คนละแถวเกินระยะนี้ถือว่าเป็นคนละแถว ใช้จัดลำดับให้คงที่ */
const ROW_TOLERANCE = 26;

/**
 * ไอคอนสีอ่อน (ขาว/เทาล้วน) ที่ตัวตรวจจับมองไม่เห็น ต้องระบุกรอบเอง
 * ตั้งชื่อลงท้ายด้วยตัวอักษรเพื่อไม่ให้ชนกับเลขลำดับที่ตรวจจับได้
 * หาพิกัดได้จาก `SHOW_BOXES=1 ... --sheet` แล้วเทียบกับคอลัมน์ในตาราง
 */
const MANUAL = {
  "desert-beach": [
    { id: "a", left: 299, top: 34, width: 20, height: 17 },  // Any DB Field ชิ้นที่ 1
    { id: "b", left: 292, top: 76, width: 32, height: 20 },  // Any DB Field ชิ้นที่ 2
    { id: "c", left: 471, top: 75, width: 28, height: 19 },  // DB Field 2 ชิ้นที่ 2
    { id: "d", left: 768, top: 40, width: 26, height: 24 },  // Pyramid Dungeon
  ],
};

/** พิกเซลที่มีสีจริง ๆ เท่านั้น ตัวอักษรดำ/เทาและเส้นตารางจะไม่ติดมา */
function colorMask(data, w, h) {
  const color = new Uint8Array(w * h);
  for (let i = 0, p = 0; i < w * h; i++, p += 3) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    if (chroma > MIN_CHROMA && lum > 26 && lum < 248) color[i] = 1;
  }
  return color;
}

function dilate(mask, w, h, radius) {
  const tmp = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let d = -radius; d <= radius && !v; d++) {
        const xx = x + d;
        if (xx >= 0 && xx < w && mask[y * w + xx]) v = 1;
      }
      tmp[y * w + x] = v;
    }
  }
  const out = new Uint8Array(w * h);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let v = 0;
      for (let d = -radius; d <= radius && !v; d++) {
        const yy = y + d;
        if (yy >= 0 && yy < h && tmp[yy * w + x]) v = 1;
      }
      out[y * w + x] = v;
    }
  }
  return out;
}

function components(mask, w, h) {
  const seen = new Uint8Array(w * h);
  const stack = new Int32Array(w * h);
  const boxes = [];
  for (let start = 0; start < w * h; start++) {
    if (!mask[start] || seen[start]) continue;
    let top = 0;
    stack[top++] = start;
    seen[start] = 1;
    let minX = w, minY = h, maxX = -1, maxY = -1, area = 0;
    while (top > 0) {
      const idx = stack[--top];
      const x = idx % w;
      const y = (idx - x) / w;
      area++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const n = ny * w + nx;
          if (mask[n] && !seen[n]) {
            seen[n] = 1;
            stack[top++] = n;
          }
        }
      }
    }
    boxes.push({ minX, minY, maxX, maxY, area });
  }
  return boxes;
}

async function detect(zone) {
  const src = path.join(SRC_DIR, `${zone}.jpg`);
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  const color = colorMask(data, w, h);
  const boxes = components(dilate(color, w, h, DILATE), w, h);

  const found = [];
  for (const b of boxes) {
    const bw = b.maxX - b.minX + 1;
    const bh = b.maxY - b.minY + 1;
    if (bw < MIN_SIDE || bh < MIN_SIDE) continue;
    if (bw > MAX_SIDE || bh > MAX_SIDE) continue;
    if (b.area < MIN_AREA) continue;
    if (b.area / (bw * bh) < MIN_FILL) continue;

    const pad = 1;
    const left = Math.max(0, b.minX + DILATE - pad);
    const top = Math.max(0, b.minY + DILATE - pad);
    const right = Math.min(w - 1, b.maxX - DILATE + pad);
    const bottom = Math.min(h - 1, b.maxY - DILATE + pad);
    if (right - left + 1 < MIN_SIDE || bottom - top + 1 < MIN_SIDE) continue;

    found.push({ left, top, width: right - left + 1, height: bottom - top + 1 });
  }

  // เรียงบนลงล่าง ซ้ายไปขวา โดยจับก้อนที่อยู่แถวเดียวกันไว้ด้วยกันก่อน
  found.sort((a, b) => a.top - b.top);
  const rows = [];
  for (const box of found) {
    const row = rows.find((r) => Math.abs(r.top - box.top) <= ROW_TOLERANCE);
    if (row) row.items.push(box);
    else rows.push({ top: box.top, items: [box] });
  }
  return rows.flatMap((r) => r.items.sort((a, b) => a.left - b.left));
}

async function cropZone(zone, { sheet }) {
  const src = path.join(SRC_DIR, `${zone}.jpg`);
  const boxes = await detect(zone);

  if (sheet) {
    const CELL = 64, PAD = 6, COLS = 12, LABEL = 14;
    const cells = [];
    for (const [i, b] of boxes.entries()) {
      cells.push(
        await sharp(src)
          .extract(b)
          .resize(CELL, CELL, { fit: "contain", background: "#ffffff" })
          .flatten({ background: "#ffffff" })
          .png()
          .toBuffer()
      );
      void i;
    }
    const rows = Math.ceil(cells.length / COLS);
    const W = COLS * (CELL + PAD) + PAD;
    const H = rows * (CELL + LABEL + PAD) + PAD;
    const comp = [];
    cells.forEach((buf, i) => {
      const x = (i % COLS) * (CELL + PAD) + PAD;
      const y = Math.floor(i / COLS) * (CELL + LABEL + PAD) + PAD;
      comp.push({ input: buf, left: x, top: y });
      comp.push({
        input: Buffer.from(
          `<svg width="${CELL}" height="${LABEL}"><text x="2" y="11" font-family="monospace" font-size="11" fill="#c1401f">${String(i + 1).padStart(2, "0")}</text></svg>`
        ),
        left: x,
        top: y + CELL,
      });
    });
    const out = path.join(process.env.SHEET_DIR ?? ROOT, `${zone}-sheet.png`);
    await sharp({ create: { width: W, height: H, channels: 3, background: "#fffaf2" } })
      .composite(comp)
      .png()
      .toFile(out);
    console.log(`${zone}: เจอ ${boxes.length} ไอคอน -> contact sheet ${out}`);
    if (process.env.SHOW_BOXES) {
      boxes.forEach((b, i) =>
        console.log(
          `  ${String(i + 1).padStart(2, "0")}  x=${String(b.left).padStart(3)} y=${String(b.top).padStart(3)}  ${b.width}x${b.height}`
        )
      );
    }
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  for (const [i, b] of boxes.entries()) {
    const name = `${zone}-${String(i + 1).padStart(2, "0")}.png`;
    await sharp(src).extract(b).png().toFile(path.join(OUT_DIR, name));
  }
  const manual = MANUAL[zone] ?? [];
  for (const m of manual) {
    const { id, ...box } = m;
    await sharp(src).extract(box).png().toFile(path.join(OUT_DIR, `${zone}-${id}.png`));
  }
  console.log(
    `${zone}: ตัด ${boxes.length} ไอคอน` +
      (manual.length ? ` + ระบุกรอบเอง ${manual.length} ชิ้น` : "") +
      ` -> public/icons/summary/`
  );
}

const args = process.argv.slice(2);
const sheet = args.includes("--sheet");
const zones = args.includes("--all")
  ? (await readdir(SRC_DIR)).filter((f) => f.endsWith(".jpg")).map((f) => path.basename(f, ".jpg")).sort()
  : args.filter((a) => !a.startsWith("--"));

if (zones.length === 0) {
  console.error("ระบุชื่อโซน เช่น: node tools/crop-summary-icons.mjs desert-beach --sheet");
  process.exit(1);
}
for (const zone of zones) await cropZone(zone, { sheet });
