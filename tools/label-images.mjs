/** สร้างสำเนาภาพที่มีชื่อไฟล์แปะไว้ด้านบน เพื่อกันสับสนตอนตรวจทานทีละหลายรูป */
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = process.argv[2];
const OUT = process.argv[3];
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const BAND = 46;

for (const f of files) {
  const base = path.basename(f, path.extname(f));
  const src = path.join(SRC, f);
  const { width, height } = await sharp(src).metadata();
  const svg = Buffer.from(
    `<svg width="${width}" height="${BAND}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${width}" height="${BAND}" fill="#111"/>
       <text x="12" y="32" font-family="monospace" font-size="30" fill="#0f0">${base}</text>
     </svg>`
  );
  await sharp({
    create: { width, height: height + BAND, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .composite([
      { input: svg, left: 0, top: 0 },
      { input: await sharp(src).toBuffer(), left: 0, top: BAND },
    ])
    .jpeg({ quality: 88 })
    .toFile(path.join(OUT, `${base}.jpg`));
}
console.log(`labeled ${files.length} files`);
