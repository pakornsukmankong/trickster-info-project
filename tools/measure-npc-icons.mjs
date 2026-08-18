/**
 * อ่านขนาดจริงของไฟล์ไอคอน NPC แล้วเขียนเป็นตารางให้เว็บใช้
 *
 *   node tools/measure-npc-icons.mjs
 *
 * เว็บต้องรู้ขนาดจริงเพื่อ 2 อย่าง
 *   1. ส่ง width/height ที่ถูกต้องให้ next/image (กันภาพกระตุกตอนโหลด)
 *   2. รู้ว่าภาพไหนถูกขยายเกินขนาดจริง จะได้เรนเดอร์แบบ pixelated ไม่ให้เบลอ
 *
 * อ่านจาก IHDR ของ PNG ตรง ๆ ไม่ต้องพึ่ง sharp จะได้รันได้โดยไม่ต้องลง dependency
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const OUT = path.join(ROOT, "src/data/npcIconSizes.ts");

async function measure(dir) {
  const full = path.join(ROOT, "public/icons", dir);
  const files = (await readdir(full)).filter((f) => f.endsWith(".png")).sort();
  const entries = [];
  for (const file of files) {
    const buf = await readFile(path.join(full, file));
    if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error(`${dir}/${file} ไม่ใช่ PNG`);
    entries.push([path.basename(file, ".png"), buf.readUInt32BE(16), buf.readUInt32BE(20)]);
  }
  return entries;
}

const entries = await measure("npcs");
const mapEntries = await measure("maps");

const table = (rows) => rows.map(([name, w, h]) => `  "${name}": [${w}, ${h}],`).join("\n");
const body = table(entries);

await writeFile(
  OUT,
  `/**
 * ขนาดจริงของไฟล์ไอคอน NPC (กว้าง, สูง)
 *
 * ไฟล์นี้สร้างด้วย \`node tools/measure-npc-icons.mjs\` อย่าแก้มือ
 * เพิ่ม/เปลี่ยนไอคอนแล้วรันใหม่
 */
export const npcIconSizes: Record<string, [number, number]> = {
${body}
};

/** ขนาดของภาพมินิแมปที่ปักหมุดไว้แล้ว (กว้าง, สูง) */
export const npcMapSizes: Record<string, [number, number]> = {
${table(mapEntries)}
};
`,
  "utf8"
);

console.log(
  `เขียนไอคอน ${entries.length} + แมพ ${mapEntries.length} รายการลง ${path.relative(ROOT, OUT)}`
);
