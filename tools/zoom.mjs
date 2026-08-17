/** ขยายบางส่วนของภาพเพื่ออ่านตัวเลขในตารางให้ชัด: node zoom.mjs <in> <out> <top%> <height%> [scale] */
import sharp from "sharp";

const [inFile, outFile, topPct, hPct, scaleRaw] = process.argv.slice(2);
const scale = Number(scaleRaw ?? 2.5);
const { width, height } = await sharp(inFile).metadata();
const top = Math.round((Number(topPct) / 100) * height);
const h = Math.min(height - top, Math.round((Number(hPct) / 100) * height));

await sharp(inFile)
  .extract({ left: 0, top, width, height: h })
  .resize(Math.round(width * scale), Math.round(h * scale), { kernel: "lanczos3" })
  .png()
  .toFile(outFile);
console.log(`${inFile} [${top}..${top + h}] x${scale} -> ${outFile}`);
