/**
 * ทำดัชนีชื่อไฟล์ไอคอนทั้งหมดให้เว็บใช้ค้นแบบอัตโนมัติ
 *
 *   node tools/build-icon-index.mjs
 *
 * ทำไมต้องมี: `src/data/icons.ts` จับคู่ชื่อ -> ไฟล์ด้วยตารางที่เขียนมือ
 * เวลาเพิ่มไอคอนใหม่แล้วลืมเพิ่มคีย์ ไอคอนนั้นจะไม่โผล่ในเว็บเลยทั้งที่ไฟล์อยู่ครบ
 * (เคยหลุดแบบนี้มาแล้ว 18 ชิ้น เช่น Lotus Flower, Dream Note, Snail Shell)
 *
 * ไฟล์นี้จึงไล่อ่านชื่อไฟล์จริงในโฟลเดอร์มาเก็บไว้ ให้ `findIcon` ใช้เป็นชั้นสำรอง
 * เมื่อตารางที่เขียนมือหาไม่เจอ — ของที่ชื่อไฟล์ตรงกับชื่อของแบบ slug จะเจอเองทันที
 *
 * ตารางที่เขียนมือยังจำเป็นอยู่สำหรับกรณีที่ชื่อไม่ตรงกับไฟล์ เช่น
 * "Legendary Recipe" ที่ใช้ไฟล์ unknown-old-document หรือคำที่ต้องจับแบบบางส่วน
 */
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const OUT = path.join(ROOT, "src/data/iconFiles.ts");
const DIRS = ["items", "monsters"];

const groups = {};
for (const dir of DIRS) {
  const files = (await readdir(path.join(ROOT, "public/icons", dir)))
    .filter((f) => f.endsWith(".png"))
    .map((f) => path.basename(f, ".png"))
    .sort();
  groups[dir] = files;
}

const body = DIRS.map(
  (dir) => `  ${dir}: new Set<string>([\n${groups[dir].map((f) => `    "${f}",`).join("\n")}\n  ]),`
).join("\n");

await writeFile(
  OUT,
  `/**
 * ชื่อไฟล์ไอคอนทั้งหมดที่มีอยู่จริงใน public/icons/
 *
 * ไฟล์นี้สร้างด้วย \`node tools/build-icon-index.mjs\` อย่าแก้มือ
 * เพิ่มหรือลบไฟล์ไอคอนแล้วรันใหม่
 */
export const iconFiles = {
${body}
};
`,
  "utf8"
);

console.log(
  `เขียนดัชนี ${DIRS.map((d) => `${d} ${groups[d].length}`).join(" + ")} รายการ -> ${path.relative(ROOT, OUT)}`
);
