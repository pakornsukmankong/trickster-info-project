/** เรียงไอคอนหลายขนาดให้ดูว่าย่อแล้วยังอ่านออกไหม: node preview-icon.mjs <icon.png> <out.png> */
import sharp from "sharp";

const [SRC, OUT] = process.argv.slice(2);
const sizes = [16, 32, 48, 64, 128];
const H = 150;

let x = 10;
const comps = [];
for (const s of sizes) {
  const buf = await sharp(SRC).resize(s, s, { kernel: "lanczos3" }).png().toBuffer();
  comps.push({ input: buf, left: x, top: Math.round((H - s) / 2) });
  x += s + 18;
}

await sharp({ create: { width: x, height: H, channels: 3, background: "#ffffff" } })
  .composite(comps)
  .png()
  .toFile(OUT);
console.log(`${sizes.join(", ")} -> ${OUT}`);
