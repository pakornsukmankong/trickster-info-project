/**
 * ตัดมินิแมปของ NPC ที่วิกิไม่มี ออกจากภาพอัลบั้มต้นฉบับ
 *
 *   node tools/crop-album-maps.mjs
 *
 * ใช้กับ NPC ที่ `fetch-wiki-icons.mjs` หาแมพให้ไม่ได้เพราะไม่โผล่ในหน้าเควสของวิกิ
 * ภาพที่ได้จะหยาบกว่าของวิกิเพราะมาจาก JPEG แต่ดีกว่าไม่มีแมพเลย
 *
 * หาพิกัดยังไง: ซูมดูบริเวณนั้นก่อน (`node tools/zoom.mjs <ภาพ> <ซ้าย> <บน> <กว้าง> <สูง>`)
 * แล้วปล่อยให้สคริปต์หาขอบเอง — มันจะสแกนหากรอบที่เป็นภาพจริงในบริเวณที่ระบุ
 * ไม่ต้องนั่งไล่พิกัดทีละพิกเซล ใส่กรอบกว้าง ๆ ที่ครอบแมพไว้ก็พอ
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..");
const MAPS = path.join(ROOT, "public/icons/maps");

/** บริเวณกว้าง ๆ ที่มีแมพอยู่ ไม่ต้องเป๊ะ สคริปต์หาขอบเอง */
const SEARCH = {
  marinel: { src: "public/images/ep1/ep1-11.jpg", left: 390, top: 325, width: 130, height: 115 },
};

/** พิกเซลที่ไม่ใช่พื้นขาวของหน้ากระดาษ (ลายน้ำจาง ๆ ไม่นับ) */
const isInk = (data, info, x, y) => {
  const p = (y * info.width + x) * info.channels;
  const [r, g, b] = [data[p], data[p + 1], data[p + 2]];
  return 0.299 * r + 0.587 * g + 0.114 * b < 215 || Math.max(r, g, b) - Math.min(r, g, b) > 35;
};

for (const [name, area] of Object.entries(SEARCH)) {
  const src = path.join(ROOT, area.src);
  const { data, info } = await sharp(src)
    .extract({ left: area.left, top: area.top, width: area.width, height: area.height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cols = [];
  const rows = [];
  for (let x = 0; x < info.width; x++) {
    let n = 0;
    for (let y = 0; y < info.height; y++) if (isInk(data, info, x, y)) n++;
    cols.push(n);
  }
  for (let y = 0; y < info.height; y++) {
    let n = 0;
    for (let x = 0; x < info.width; x++) if (isInk(data, info, x, y)) n++;
    rows.push(n);
  }

  // แมพเป็นบล็อกทึบ คอลัมน์/แถวที่อยู่ในแมพจะมีหมึกเกือบเต็มความสูง/ความกว้าง
  const first = (arr, th) => arr.findIndex((v) => v > th);
  const last = (arr, th) => arr.length - 1 - [...arr].reverse().findIndex((v) => v > th);
  const x0 = first(cols, info.height * 0.6);
  const x1 = last(cols, info.height * 0.6);
  const y0 = first(rows, info.width * 0.35);
  const y1 = last(rows, info.width * 0.35);
  if (x0 < 0 || y0 < 0) {
    console.warn(`${name}: หาขอบแมพไม่เจอในบริเวณที่ให้มา`);
    continue;
  }

  const box = {
    left: area.left + x0,
    top: area.top + y0,
    width: x1 - x0 + 1,
    height: y1 - y0 + 1,
  };
  const png = await sharp(src).extract(box).png().toBuffer();
  await mkdir(MAPS, { recursive: true });
  await writeFile(path.join(MAPS, `${name}.png`), png);
  console.log(`${name}: ${area.src} @ ${box.left},${box.top} -> ${box.width}x${box.height}`);
}
