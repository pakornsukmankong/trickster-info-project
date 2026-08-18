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
    npcIconSizes.ts        ขนาดจริงของสไปรต์/มินิแมป (สร้างด้วยสคริปต์ อย่าแก้มือ)
  lib/                     useProgress (localStorage), site (URL ของเว็บ)
public/
  brand/                   โลโก้ต้นฉบับ
  images/ep0/ ep1/         ภาพต้นฉบับจากอัลบั้ม ตอนละ 24 รูป
  icons/items/             ไอคอนไอเทม 88 ชิ้น
  icons/monsters/          ภาพมอนสเตอร์ 14 ตัว
  icons/npcs/              สไปรต์ NPC 31 ตัว
  icons/maps/              มินิแมปปักหมุดจุดที่ NPC ยืน 29 ภาพ
tools/                     สคริปต์ดึง/ตัดไอคอน (มี package.json แยก ไม่เกี่ยวกับ build ของเว็บ)
  fetch-wiki-icons.mjs     ดึงไอคอนจาก wikimirror.lifeto.co
  crop-album-maps.mjs      ตัดมินิแมปจากภาพอัลบั้ม สำหรับตัวที่วิกิไม่มี
  measure-npc-icons.mjs    อ่านขนาดไฟล์ไปเขียน npcIconSizes.ts
  manifests/wiki-icons.json  ไฟล์ไหนมาจากภาพอะไรในวิกิ
```

## เพิ่มตอนใหม่

1. วางภาพต้นฉบับไว้ที่ `public/images/<slug>/`
2. สร้างไฟล์ข้อมูลตามแบบของ `src/data/ep1.ts` (ใช้ type `Episode` เดิม)
3. เพิ่มเข้า array `episodes` ใน `src/data/episodes.ts`
4. เพิ่มไอเทม/มอนใน `items.ts` และ `monsters.ts` (อย่าลืมใส่ `episode`)
5. หาไอคอนของ NPC / ไอเทม / มอนตัวใหม่ ตามหัวข้อ
   [ไอคอน: ดึงจาก wikimirror.lifeto.co](#ไอคอน-ดึงจาก-wikimirrorlifetoco) แล้วเพิ่มคีย์ใน `src/data/icons.ts`
6. route `/[episode]/[chapter]` กับ `sitemap.xml` จะอัปเดตให้เอง

## ไอคอน: ดึงจาก wikimirror.lifeto.co

**อ่านหัวข้อนี้ก่อนถ้าจะเพิ่มหรือแก้ไอคอน** ตอนนี้ไอคอน NPC มอนสเตอร์ มินิแมป และไอเทมบางส่วน
ดึงมาจาก [wikimirror.lifeto.co](https://wikimirror.lifeto.co/wiki.ggftw.com/trickster/Episode_0_Quests.html)
ซึ่งเก็บไฟล์จากตัวเกมไว้ตรง ๆ มี alpha channel ขอบคมทุกพิกเซล
ต่างจากชุดแรกของโปรเจกต์ที่ครอปจากภาพถ่ายหน้าจอในอัลบั้ม (ผ่าน JPEG มาแล้วขอบเลยเบลอและมีฝ้า)

### ขั้นตอนเวลาจะดึงใหม่

```bash
node tools/fetch-wiki-icons.mjs --dry
```

ดูก่อนว่าจะเปลี่ยนอะไรบ้าง ยังไม่เขียนไฟล์ บรรทัดผลลัพธ์บอกขนาดเดิม → ขนาดใหม่ทีละไฟล์

```bash
node tools/fetch-wiki-icons.mjs --sheet /tmp/sheet.png
```

ทำ contact sheet เทียบซ้ายเก่า/ขวาใหม่ทุกคู่ **ควรเปิดดูก่อนเสมอ** เพราะการจับคู่ใช้ข้อความ `alt`
ในหน้าวิกิ ซึ่งบางทีชี้ไปคนละภาพ (เช่น Antique Mirror ในวิกิใช้ไฟล์ชื่อ `Gold_Hand_Mirror.gif`)

```bash
node tools/fetch-wiki-icons.mjs
```

เขียนไฟล์จริง แล้วอัปเดต `tools/manifests/wiki-icons.json` (บันทึกว่าไฟล์ไหนมาจากภาพอะไร)

```bash
node tools/measure-npc-icons.mjs
```

**ห้ามลืมขั้นนี้** — อ่านขนาดจริงของไฟล์ใหม่ไปเขียน `src/data/npcIconSizes.ts`
เว็บใช้ขนาดนี้ 2 อย่าง คือส่งให้ `next/image` (กันภาพกระตุกตอนโหลด) และดูว่าภาพไหนเล็กกว่าช่องแสดงผล
ตัวที่เล็กกว่าจะถูกเรนเดอร์แบบ `pixelated` พร้อมส่ง PNG ต้นฉบับแทนการแปลงเป็น WebP
เพื่อให้ขอบคมแบบภาพพิกเซลแทนที่จะเบลอ

จบแล้ว `npm run build` และเปิดหน้าเควสดูของจริงสักบทหนึ่ง

### กติกาการเลือกไฟล์

ชื่อเดียวในวิกิมักมีหลายภาพ (สไปรต์ในเกม / ภาพอาร์ต / ไอคอนเล็ก) สคริปต์เลือกตามกลุ่ม

- **NPC** เอาสไปรต์ในเกม (`.gif`) ตัวใหญ่สุด ไม่เอาภาพอาร์ต เพราะต้องให้ผู้เล่นจำหน้าในเกมได้
- **มอนสเตอร์** เอาภาพอาร์ต (`.png`) ตัวใหญ่สุด เพราะสไปรต์มอนในเกมเล็กมาก (Torobbie แค่ 44×26)
  เล็กเกินกว่าจะดูออกในตาราง
- **ไอเทม** เอาต่อเมื่อของวิกิใหญ่กว่าของเดิม ไอเทมส่วนใหญ่ในวิกิมีแค่ไอคอน 25×25 ในเกม
  ซึ่งเล็กกว่าที่เราครอปไว้ พวกนั้นคงของเดิมไว้ ตอนนี้เลยเปลี่ยนไปแค่ 17 จาก 88 ชิ้น

แก้พฤติกรรมได้ 2 ที่ในหัวไฟล์ `tools/fetch-wiki-icons.mjs`

- `ALIASES` — ชื่อไฟล์ของเรากับชื่อในวิกิไม่ตรงกัน เช่น `baby-carrot` ในวิกิชื่อ `Carrot`
- `SKIP` — เจอว่าจับคู่ผิดตอนดู contact sheet ใส่ `"items/ชื่อ"` ไว้แล้วมันจะข้ามไป ไม่ทับของเดิม

### มินิแมป

หน้าเควสของวิกิวางภาพแมพคู่กับ `Circle.gif` ที่ตำแหน่ง absolute เพื่อชี้จุดที่ NPC ยืน
สคริปต์อ่านพิกัดนั้นออกมาแล้วแปะวงกลมทับแมพเอง เก็บเป็น `public/icons/maps/<npc>.png` หนึ่งไฟล์ต่อ NPC
เพราะ NPC คนละตัวที่อยู่แมพเดียวกันปักหมุดคนละจุด

ระวังตอนแก้ตัวจับคู่ (`MAP_ROW` ในสคริปต์) — วิกิเขียน `alt` ของภาพแมพไม่เหมือนกันทุกแถว
บางแถวเป็น `alt="Image:<ชื่อ>.png"` บางแถวเป็นชื่อโซนเฉย ๆ ตอนนี้เลยดูแค่ว่า `src` ลงท้าย `.png`
ไม่ไปยุ่งกับรูปแบบ `alt` (เคยพลาดตรงนี้มาแล้ว ทำให้หลุดไป 4 ตัว)

ตัวที่วิกิไม่มีให้ ตัดจากภาพอัลบั้มแทน

```bash
node tools/crop-album-maps.mjs
```

ใส่ NPC เพิ่มได้ในตาราง `SEARCH` ที่หัวไฟล์ ระบุแค่บริเวณกว้าง ๆ ที่มีแมพอยู่ ไม่ต้องเป๊ะ
สคริปต์จะสแกนหาขอบของแมพเอง (หาพิกัดคร่าว ๆ ได้ด้วย `node tools/zoom.mjs`)

ตอนนี้ได้ 29 จาก 31 ตัว เหลือ **Compounder Paul** กับ **Item Girl** ที่ยังไม่มีแมพ
เพราะทั้งสองตัวไม่โผล่ในหน้าเควสของวิกิเลย และในภาพอัลบั้มก็ปรากฏแค่สไปรต์ไม่มีแมพติดมาด้วย
(ตรวจแล้วที่ `ep0-06`, `ep1-11`, `ep1-13`) การ์ดของสองตัวนี้แสดงแค่สไปรต์ ซึ่งไม่พังอะไร
เพราะชื่อแผนที่บอกเป็นข้อความอยู่แล้ว

เว็บรู้ว่า NPC ตัวไหนมีแมพจาก `npcMapSizes` ใน `src/data/npcIconSizes.ts` ซึ่ง
`measure-npc-icons.mjs` อ่านจากไฟล์ที่มีอยู่จริงในโฟลเดอร์ ไม่ว่าแมพนั้นจะมาจากวิกิหรือจากอัลบั้ม
**เพิ่มแมพใหม่แล้วต้องรัน `measure-npc-icons.mjs` ทุกครั้ง** ไม่งั้นเว็บจะยังไม่เห็น

### เครดิต

ไฟล์พวกนี้เป็นสไปรต์จากตัวเกมที่วิกิเก็บไว้ ถ้าดึงเพิ่มอย่าลืมคงเครดิต
`wikimirror.lifeto.co` ใน `src/components/SiteFooter.tsx` ไว้

## ตัดไอคอนจากภาพอัลบั้ม (วิธีเดิม)

วิธีนี้เป็นชุดแรกของโปรเจกต์ ตอนนี้ยังใช้อยู่กับไอเทมราว 70 ชิ้นที่วิกิไม่มีภาพใหญ่กว่า
**ถ้าจะเพิ่มไอคอนใหม่ ลองหาจากวิกิก่อน** (หัวข้อด้านบน) คุณภาพดีกว่าและไม่ต้องมานั่งจับคู่กรอบเอง
ใช้วิธีนี้เมื่อวิกิไม่มีของชิ้นนั้นจริง ๆ

ไอคอนชุดนี้ตัดจากภาพต้นฉบับด้วยสคริปต์ ไม่ได้ครอปมือทีละรูป

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

เนื้อหาเควสทั้งหมดเรียบเรียงจากอัลบั้มภาพของกลุ่ม [Trickster Adventure](https://www.facebook.com/groups/1193501945887369)
บน Facebook (EP 0 และ EP 1 ตอนละ 24 รูป)

ไอคอน NPC มอนสเตอร์ มินิแมป และไอเทมบางส่วนมาจาก
[wikimirror.lifeto.co](https://wikimirror.lifeto.co/wiki.ggftw.com/trickster/Episode_0_Quests.html)
ซึ่งเก็บไฟล์จากตัวเกมไว้ ส่วนไอเทมที่เหลือยังตัดมาจากภาพอัลบั้มชุดเดียวกัน

ยังมีอัลบั้ม “Episode + Key Quest จำนวนของที่ต้องใช้” (19 รูป) ในกลุ่มเดียวกันที่ยังไม่ได้นำเข้า —
เป็นงานถัดไปถ้าจะเพิ่มข้อมูลจำนวนของที่ต้องใช้ของแต่ละ Key Quest

เครดิตข้อมูลและภาพเป็นของกลุ่ม Trickster Adventure ผู้จัดทำอัลบั้มต้นฉบับ และผู้ดูแลวิกิ
เว็บนี้เป็นคู่มือที่ทำโดยผู้เล่นเพื่อผู้เล่น ไม่ได้เกี่ยวข้องกับผู้ให้บริการเกม
