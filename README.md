# Trickster Info — คู่มือเกม Trickster Online (ภาษาไทย)

เว็บคู่มือเดินเควส Trickster Online เรียบเรียงจากอัลบั้มภาพของกลุ่ม **Trickster Adventure**
บน Facebook ตอนนี้มีข้อมูลครบของ **Episode 0** และ **Episode 1** แล้ว

จัดทำโดย [FLOKZ CHANNEL](https://www.youtube.com/@flokzchannel)

## รันโปรเจกต์

```bash
npm install
```

```bash
npm run dev
```

เปิด http://localhost:3000

```bash
npm run build
```

## Deploy ขึ้น Vercel

แอป Next.js อยู่ที่รากrepo แล้ว Vercel ตรวจเจอเอง **ไม่ต้องตั้งค่าอะไรเลย**
New Project → เลือก repo → Deploy จบ

หรือผ่าน CLI

```bash
npx vercel --prod
```

### ตัวแปรแวดล้อม

ไม่ต้องตั้งอะไรก็ deploy ได้ — `src/lib/site.ts` จะอ่าน `VERCEL_PROJECT_PRODUCTION_URL`
ที่ Vercel ใส่ให้เองมาใช้เป็น URL ใน `sitemap.xml`, `robots.txt` และ Open Graph

เมื่อผูกโดเมนจริงแล้วค่อยตั้ง `NEXT_PUBLIC_SITE_URL` เป็นโดเมนนั้น (เช่น `https://trickster.info`)
ค่านี้จะทับค่าของ Vercel

### SEO / การแชร์ลิงก์

- `src/app/sitemap.ts` — สร้าง `sitemap.xml` จากรายการตอนอัตโนมัติ เพิ่มตอนใหม่แล้วไม่ต้องแก้
- `src/app/robots.ts` — `robots.txt` พร้อมลิงก์ sitemap
- `src/app/opengraph-image.png` — ภาพพรีวิว 1200×630 ตอนแชร์ลิงก์

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
src/
  app/
    [episode]/[chapter]/   หน้าเควสของแต่ละบท (static ทุกตอน)
    items/  monsters/      หน้าอ้างอิง
    icon.png  apple-icon.png  opengraph-image.png
    sitemap.ts  robots.ts
  components/              การ์ดเควส, แถบความคืบหน้า, lightbox, header/footer, ตัวนับผู้เข้าชม
  data/
    types.ts               โครงสร้างข้อมูลกลาง (Episode / Chapter / QuestStep / Item / Monster)
    ep0.ts  ep1.ts         ข้อมูลเควสของแต่ละตอน
    episodes.ts            รวมทุกตอน + helper (getEpisode / getChapter / stepIds)
    items.ts  monsters.ts  ข้อมูลอ้างอิง แยก ep0/ep1 แล้ว export รวม
    icons.ts               จับคู่ชื่อ -> ไฟล์ไอคอน
  lib/                     useProgress (localStorage), site (URL ของเว็บ)
public/
  brand/                   โลโก้ต้นฉบับ
  images/ep0/ ep1/         ภาพต้นฉบับจากอัลบั้ม ตอนละ 24 รูป
  icons/items/             ไอคอนไอเทม 88 ชิ้น
  icons/monsters/          สไปรต์มอนสเตอร์ 14 ตัว
  icons/npcs/              ภาพ NPC 31 ตัว
tools/                     สคริปต์ตัดไอคอน (มี package.json แยก ไม่เกี่ยวกับ build ของเว็บ)
```

## เพิ่มตอนใหม่

1. วางภาพต้นฉบับไว้ที่ `public/images/<slug>/`
2. สร้างไฟล์ข้อมูลตามแบบของ `src/data/ep1.ts` (ใช้ type `Episode` เดิม)
3. เพิ่มเข้า array `episodes` ใน `src/data/episodes.ts`
4. เพิ่มไอเทม/มอนใน `items.ts` และ `monsters.ts` (อย่าลืมใส่ `episode`)
5. route `/[episode]/[chapter]` กับ `sitemap.xml` จะอัปเดตให้เอง

## ตัดไอคอน (tools/)

ไอคอนทั้งหมดตัดจากภาพต้นฉบับด้วยสคริปต์ ไม่ได้ครอปมือทีละรูป

```bash
node tools/extract-icons.mjs <โฟลเดอร์ภาพต้นฉบับ> <โฟลเดอร์ผลลัพธ์>
```

`extract-icons.mjs` ทำ ink mask (แยกหมึกออกจากพื้นขาวและลายน้ำ) แล้วหา connected component
คัดเฉพาะก้อนที่ขนาด/สัดส่วน/ความอิ่มสีเข้าข่ายไอคอน จากนั้นออก contact sheet ให้ตรวจว่าอันไหนคืออะไร
ปรับความไวด้วย env `MIN_COLOR_RATIO` และจำกัดไฟล์ด้วย `ONLY`

```bash
node tools/build-assets.mjs ep1 <crops> <crops2> public <โฟลเดอร์ภาพต้นฉบับ>
```

`build-assets.mjs` อ่าน manifest จาก `tools/manifests/<ตอน>.mjs` ที่จับคู่ candidate กับชื่อจริง
ไอคอนสีขาวที่ตรวจจับไม่เจอให้ระบุกรอบเองในตัวแปร `MANUAL` และตัดส่วนเกินด้วย `ADJUST`
(หาพิกัดได้จาก `node tools/debug-boxes.mjs <ภาพ> 2 218 30`)

## ไอคอนเว็บ (favicon)

โลโก้ต้นฉบับอยู่ที่ `public/brand/trickster-info-logo.png` (1933×813)
รูปเป็นแนวนอนยาว ย่อลงช่องไอคอนแล้วอ่านไม่ออก จึงตัดเฉพาะแมวมาสคอตด้านขวามาใช้

```bash
node tools/make-icons.mjs public/brand/trickster-info-logo.png src/app
```

สคริปต์จะคีย์พื้นหลังฟ้าออกให้เหลือเงาแมวโปร่งใส (ใช้ morphological opening กัดเส้นตัวอักษร
ที่ติดมาในกรอบออก แล้วเก็บเฉพาะก้อนที่ใหญ่ที่สุด) แล้ววางบนพื้นไล่สีโทนเดียวกับโลโก้
ได้ผลเป็น `src/app/icon.png` (512), `apple-icon.png` (180) และ `opengraph-image.png` (1200×630)
ซึ่ง Next.js หยิบไปใส่ `<head>` เอง

ดูว่าย่อแล้วยังอ่านออกไหมด้วย `node tools/preview-icon.mjs src/app/icon.png out.png`

เครื่องมือช่วยอื่น ๆ

- `label-images.mjs` — แปะชื่อไฟล์ลงบนภาพ กันสับสนตอนตรวจทานหลายรูปพร้อมกัน
- `zoom.mjs` — ขยายบางส่วนของภาพเพื่ออ่านตัวเลขในตารางสเตตัสให้ชัด
- `verify-assets.mjs` — ทำ contact sheet ของไอคอนที่ตั้งชื่อแล้ว ไว้ตรวจว่าจับคู่ถูก

เวลาเพิ่มไอคอนใหม่ อย่าลืมเพิ่มคีย์ใน `src/data/icons.ts` ด้วย
ตัวจับคู่ใช้กติกา "คีย์ที่ยาวที่สุดที่อยู่ในชื่อนั้นชนะ" (เช่น `Golden Mole Feather` ชนะ `Golden Mole`)

## ตัวนับผู้เข้าชม

มีตัวนับ 2 ชั้น ไม่ต้องมี backend ของเราเอง

**เลขที่โชว์ใน footer** — [`src/components/ViewCounter.tsx`](src/components/ViewCounter.tsx) ยิงไปที่
[Abacus](https://jasoncameron.dev/abacus) บริการนับฟรีที่เรียกจากเบราว์เซอร์ได้ตรง ๆ
นับเพิ่มครั้งเดียวต่อหนึ่ง session (จำด้วย `sessionStorage`) ตอน dev จะอ่านค่าอย่างเดียวไม่ยิงเพิ่ม
ถ้าบริการล่มหรือโดน ad blocker บล็อกจะไม่แสดงอะไรเลย หน้าเว็บไม่พัง

ตัวนับอยู่ที่ namespace `trickster-info-project.vercel.app` key `site-views`
เลขนี้ใครก็ยิงเพิ่มได้ถ้ารู้ URL เอาไว้ประดับเว็บ ไม่ใช่สถิติที่เชื่อถือได้
ถ้าโดนปั่นจนเพี้ยนให้รีเซ็ตด้วย admin key (เก็บไว้นอกรีโป อย่า commit)

```bash
curl -X POST -H "Authorization: Bearer <admin-key>" \
  https://abacus.jasoncameron.dev/reset/trickster-info-project.vercel.app/site-views
```

**สถิติจริงสำหรับดูเอง** — `<Analytics />` จาก `@vercel/analytics` ใน `src/app/layout.tsx`
ให้ทั้ง page view และ unique visitor แยกตามหน้า ดูได้ที่แท็บ Analytics ในโปรเจกต์บน Vercel
(ต้องกดเปิด Web Analytics ใน dashboard ครั้งแรกก่อน) ตอน dev จะเป็น debug mode ไม่ส่งข้อมูลจริง

## ที่มาของข้อมูล

เนื้อหาทั้งหมดเรียบเรียงจากอัลบั้มภาพของกลุ่ม [Trickster Adventure](https://www.facebook.com/groups/1193501945887369)
บน Facebook (EP 0 และ EP 1 ตอนละ 24 รูป) ไอคอนไอเทม มอนสเตอร์ และ NPC ตัดมาจากภาพต้นฉบับชุดเดียวกัน

ยังมีอัลบั้ม “Episode + Key Quest จำนวนของที่ต้องใช้” (19 รูป) ในกลุ่มเดียวกันที่ยังไม่ได้นำเข้า —
เป็นงานถัดไปถ้าจะเพิ่มข้อมูลจำนวนของที่ต้องใช้ของแต่ละ Key Quest

เครดิตข้อมูลและภาพทั้งหมดเป็นของกลุ่ม Trickster Adventure และผู้จัดทำอัลบั้มต้นฉบับ
เว็บนี้เป็นคู่มือที่ทำโดยผู้เล่นเพื่อผู้เล่น ไม่ได้เกี่ยวข้องกับผู้ให้บริการเกม
