/** สร้าง contact sheet ของไอคอนที่ตั้งชื่อแล้ว เพื่อตรวจว่าจับคู่ชื่อถูกต้อง */
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const DIR = process.argv[2];
const OUT = process.argv[3];
const CELL = 112;
const LABEL = 30;
const COLS = Number(process.argv[4] ?? 6);

const files = (await readdir(DIR)).filter((f) => f.endsWith(".png")).sort();
const rows = Math.ceil(files.length / COLS);
const W = COLS * CELL;
const H = rows * (CELL + LABEL);

const composites = [];
const labels = [];
for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const cx = (i % COLS) * CELL;
  const cy = Math.floor(i / COLS) * (CELL + LABEL);
  const buf = await sharp(path.join(DIR, f))
    .resize(CELL - 14, CELL - 14, { fit: "contain", background: "#fff", kernel: "nearest" })
    .png()
    .toBuffer();
  composites.push({ input: buf, left: cx + 7, top: cy + 7 });
  const name = path.basename(f, ".png");
  labels.push(
    `<text x="${cx + CELL / 2}" y="${cy + CELL + 16}" font-family="monospace" font-size="10" fill="#111" text-anchor="middle">${name.slice(0, 20)}</text>`
  );
}

const svg = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${labels.join("")}</svg>`
);
await sharp({ create: { width: W, height: H, channels: 3, background: "#fff" } })
  .composite([...composites, { input: svg, left: 0, top: 0 }])
  .png()
  .toFile(OUT);
console.log(`${files.length} icons -> ${OUT}`);
