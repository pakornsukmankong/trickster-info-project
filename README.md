# Trickster Adventure — คู่มือเควส Trickster Online (ภาษาไทย)

เว็บคู่มือเดินเควส Trickster Online เรียบเรียงจากอัลบั้มภาพของเพจ **Trickster Adventure**
บน Facebook ตอนนี้มีข้อมูลครบของ **Episode 0** และ **Episode 1** แล้ว

## รันโปรเจกต์

```bash
npm --prefix web install
```

```bash
npm --prefix web run dev
```

เปิด http://localhost:3000

```bash
npm --prefix web run build
```

## หน้าในเว็บ

| เส้นทาง | เนื้อหา |
| --- | --- |
| `/` | หน้าแรก รายการตอนทั้งหมด |
| `/ep0` | ภาพรวม Episode 0 (Lv.1+) + แถบความคืบหน้า + บั๊กที่ควรรู้ |
| `/ep0/chapter-1` | ก้าวแรกที่ Coral Town (7 ขั้นตอน) |
| `/ep0/chapter-2` | ข้ามถ้ำสู่ทะเลทราย (7 ขั้นตอน) |
| `/ep0/chapter-3` | ล่า Welcome Seal 8 อัน (7 ขั้นตอน) |
| `/ep1` | ภาพรวม Episode 1 (Lv.45+) |
| `/ep1/chapter-1` | สร้อยของเนเฟอร์ติติ (9 ขั้นตอน) |
| `/ep1/chapter-2` | กล่องโบราณปริศนา (7 ขั้นตอน) |
| `/ep1/chapter-3` | นักล่าสมบัติฮาคอน (4 ขั้นตอน) |
| `/monsters` | ตารางค่าสถานะมอนสเตอร์ทั้ง 14 ตัว แยกตามตอน |
| `/items` | คลังไอเทม 83 ชิ้น ค้นหา/กรองตามตอนและประเภทได้ |

ทุกขั้นตอนติ๊ก "ทำแล้ว" ได้ สถานะเก็บใน `localStorage` ของเบราว์เซอร์

## โครงสร้างโค้ด

```
web/src/
  app/
    [episode]/[chapter]/   หน้าเควสของแต่ละบท (static ทุกตอน)
    items/  monsters/      หน้าอ้างอิง
  components/              การ์ดเควส, แถบความคืบหน้า, lightbox, header/footer
  data/
    types.ts               โครงสร้างข้อมูลกลาง (Episode / Chapter / QuestStep / Item / Monster)
    ep0.ts  ep1.ts         ข้อมูลเควสของแต่ละตอน
    episodes.ts            รวมทุกตอน + helper (getEpisode / getChapter / stepIds)
    items.ts  monsters.ts  ข้อมูลอ้างอิง แยก ep0/ep1 แล้ว export รวม
    icons.ts               จับคู่ชื่อ -> ไฟล์ไอคอน
web/public/
  images/ep0/ ep1/         ภาพต้นฉบับจากอัลบั้ม ตอนละ 24 รูป
  icons/items/             ไอคอนไอเทม 88 ชิ้น
  icons/monsters/          สไปรต์มอนสเตอร์ 14 ตัว
  icons/npcs/              ภาพ NPC 31 ตัว
tools/                     สคริปต์ตัดไอคอนออกจากภาพต้นฉบับ
```

## เพิ่มตอนใหม่

1. วางภาพต้นฉบับไว้ที่ `web/public/images/<slug>/`
2. สร้างไฟล์ข้อมูลตามแบบของ `web/src/data/ep1.ts` (ใช้ type `Episode` เดิม)
3. เพิ่มเข้า array `episodes` ใน `web/src/data/episodes.ts`
4. เพิ่มไอเทม/มอนใน `items.ts` และ `monsters.ts` (อย่าลืมใส่ `episode`)
5. route `/[episode]/[chapter]` จะสร้างหน้าใหม่ให้เอง

## ตัดไอคอน (tools/)

ไอคอนทั้งหมดตัดจากภาพต้นฉบับด้วยสคริปต์ ไม่ได้ครอปมือทีละรูป

```bash
node tools/extract-icons.mjs <โฟลเดอร์ภาพต้นฉบับ> <โฟลเดอร์ผลลัพธ์>
```

`extract-icons.mjs` ทำ ink mask (แยกหมึกออกจากพื้นขาวและลายน้ำ) แล้วหา connected component
คัดเฉพาะก้อนที่ขนาด/สัดส่วน/ความอิ่มสีเข้าข่ายไอคอน จากนั้นออก contact sheet ให้ตรวจว่าอันไหนคืออะไร
ปรับความไวด้วย env `MIN_COLOR_RATIO` และจำกัดไฟล์ด้วย `ONLY`

```bash
node tools/build-assets.mjs ep1 <crops> <crops2> web/public <โฟลเดอร์ภาพต้นฉบับ>
```

`build-assets.mjs` อ่าน manifest จาก `tools/manifests/<ตอน>.mjs` ที่จับคู่ candidate กับชื่อจริง
ไอคอนสีขาวที่ตรวจจับไม่เจอให้ระบุกรอบเองในตัวแปร `MANUAL` และตัดส่วนเกินด้วย `ADJUST`
(หาพิกัดได้จาก `node tools/debug-boxes.mjs <ภาพ> 2 218 30`)

## ไอคอนเว็บ (favicon)

โลโก้ต้นฉบับอยู่ที่ `web/public/brand/trickster-info-logo.png` (1933×813)
รูปเป็นแนวนอนยาว ย่อลงช่องไอคอนแล้วอ่านไม่ออก จึงตัดเฉพาะแมวมาสคอตด้านขวามาใช้

```bash
node tools/make-icons.mjs web/public/brand/trickster-info-logo.png web/src/app
```

สคริปต์จะคีย์พื้นหลังฟ้าออกให้เหลือเงาแมวโปร่งใส (ใช้ morphological opening กัดเส้นตัวอักษร
ที่ติดมาในกรอบออก แล้วเก็บเฉพาะก้อนที่ใหญ่ที่สุด) แล้ววางบนพื้นไล่สีโทนเดียวกับโลโก้
ได้ผลเป็น `web/src/app/icon.png` (512) กับ `apple-icon.png` (180) ซึ่ง Next.js หยิบไปใส่ `<head>` เอง

ดูว่าย่อแล้วยังอ่านออกไหมด้วย `node tools/preview-icon.mjs web/src/app/icon.png out.png`

เครื่องมือช่วยอื่น ๆ

- `label-images.mjs` — แปะชื่อไฟล์ลงบนภาพ กันสับสนตอนตรวจทานหลายรูปพร้อมกัน
- `zoom.mjs` — ขยายบางส่วนของภาพเพื่ออ่านตัวเลขในตารางสเตตัสให้ชัด
- `verify-assets.mjs` — ทำ contact sheet ของไอคอนที่ตั้งชื่อแล้ว ไว้ตรวจว่าจับคู่ถูก

เวลาเพิ่มไอคอนใหม่ อย่าลืมเพิ่มคีย์ใน `web/src/data/icons.ts` ด้วย
ตัวจับคู่ใช้กติกา "คีย์ที่ยาวที่สุดที่อยู่ในชื่อนั้นชนะ" (เช่น `Golden Mole Feather` ชนะ `Golden Mole`)

## ที่มาของข้อมูล

- [อัลบั้ม “Ep 0 เควส ชายหาด – ทะเลทราย”](https://www.facebook.com/media/set/?set=oa.2119324875486371&type=3) — 24 รูป
- [อัลบั้ม “EP 1 เควส ซากโบราณ – ท่าเรือ”](https://www.facebook.com/media/set/?set=oa.1469326131227407&type=3) — 24 รูป
- [อัลบั้ม “Episode + Key Quest จำนวนของที่ต้องใช้”](https://www.facebook.com/media/set?set=oa.3490341214689969&type=3) — 19 รูป (ยังไม่ได้นำเข้า)

เครดิตข้อมูลและภาพทั้งหมดเป็นของเพจ Trickster Adventure และผู้จัดทำอัลบั้มต้นฉบับ
เว็บนี้เป็นคู่มือที่ทำโดยผู้เล่นเพื่อผู้เล่น ไม่ได้เกี่ยวข้องกับผู้ให้บริการเกม
