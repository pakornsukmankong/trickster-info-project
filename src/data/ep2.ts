import type { Episode } from "./types";

const img = (n: number) => `/images/ep2/ep2-${String(n).padStart(3, "0")}.jpg`;

export const ep2: Episode = {
  slug: "ep2",
  group: "ep",
  number: 2,
  title: "เกาะลวงตา",
  titleEn: "Episode 2 — Mirage Island",
  levelHint: "ต่อจาก EP 1 (มอนในสายนี้ Lv.86 ขึ้นไป)",
  tagline:
    "ตามรอยดาบต้องสาปของ Tanya จากวังเงือกไปจนถึงเกาะลวงตา ไล่เก็บเพลงแห่งความทรงจำ แล้วปิดท้ายด้วยคำสาปของสามพี่น้องแห่งโชคชะตา",
  areas: [
    "Gate of Mermaid Dungeon",
    "Oops Wharf",
    "Path to Caballa Relics / Relics Field 2",
    "Gate of Mirage Island",
    "Mirage Island Field 1–3",
    "Mirage Island Dungeon 1–2",
    "Coral Beach Fields",
    "Pyramid Dungeon 2",
  ],
  status: "ready",
  notes: [
    "Don Giuvanni ที่ท่าเรือมีเควสที่คุยได้เฉพาะเวลากลางคืนเท่านั้น ส่วน Old Artist กับบางเควสของ EP 1 คุยได้เฉพาะกลางวัน",
    "Abiox ที่ใช้ส่ง Portina ควรเก็บเผื่อไว้สัก 10 อัน เพราะต้องใช้ส่ง Sea Spirit Rumo กับ Lachesis อีกอย่างละแผ่นในบทที่ 3",
    "Voucher of Promise ที่ได้จากบทที่ 1 ต้องเก็บไว้ยาว ๆ เพราะไปใช้ตอนให้ Kahlihara ปรุงยาพิษในบทที่ 3",
    "Bloody Rune of Fate มีโอกาสขุดได้แค่ 1.3% เป็นด่านที่กินเวลาที่สุดของ EP นี้ แนะนำให้ทยอยขุดไปเรื่อย ๆ ระหว่างทำเควสอื่น",
  ],
  chapters: [
    {
      slug: "chapter-1",
      number: 1,
      title: "ดาบแห่งการล้างแค้น",
      titleEn: "Chapter 1 — Sword of Vengeance",
      area: "Gate of Mermaid Dungeon / Oops Wharf / Relics Field 2",
      levelHint: "ต้องตี Tanya (Lv.150) ได้",
      intro:
        "เปิด EP 2 ด้วยการเอาดาบของ Tanya ไปให้ Kahlihara แปลงเป็น Sword of Vengeance แล้ววิ่งส่งของระหว่างท่าเรือกับซากโบราณ จบบทจะได้ตั๋วขึ้นเรือไปเกาะลวงตา",
      steps: [
        {
          id: "e2c1-kahlihara",
          title: "Kahlihara ขอดาบของ Tanya",
          npc: "Kahlihara",
          location: "Gate of Mermaid Dungeon",
          summary: [
            "เริ่มต้นที่ Kahlihara นางจะขอดาบ 1 เล่ม",
            "Tanya's Sword ดรอปจาก Tanya (Lv.150) ใน Mermaid Dungeon 2",
            "ส่งแล้วจะได้ดาบใหม่ 1 เล่มมาแทน",
          ],
          requirements: [
            { name: "Tanya's Sword", qty: "1 เล่ม", from: "ตี Tanya (Lv.150) @ Mermaid Dungeon 2 – Legend of the Sea" },
          ],
          rewards: [{ name: "Sword of Vengeance", kind: "item" }],
          images: [img(1), img(2)],
        },
        {
          id: "e2c1-rosaline",
          title: "Rosaline Gracia รับดาบไปตรวจ",
          npc: "Rosaline Gracia",
          location: "Oops Wharf",
          summary: [
            "กลับไปท่าเรือตามหา Rosaline Gracia",
            "หลังส่งเควสจะได้ดาบคืนมาพร้อมเควสใหม่",
          ],
          requirements: [{ name: "Sword of Vengeance", from: "เควส Kahlihara" }],
          rewards: [{ name: "Nefertiti's Portrait", kind: "item" }],
          images: [img(3)],
        },
        {
          id: "e2c1-robin",
          title: "ส่งภาพกับผ้าดำให้ Love Hunter Robin",
          npc: "Love Hunter Robin",
          location: "Path to Caballa Relics",
          summary: [
            "กลับไปหา Love Hunter Robin ส่งภาพวาดกับแผ่นหนัง 3 แผ่น",
            "Dark Cloth ดรอปจาก Crow (Lv.88)",
          ],
          requirements: [
            { name: "Nefertiti's Portrait", from: "เควส Rosaline Gracia" },
            { name: "Dark Cloth", qty: "3 แผ่น", from: "ตี Crow (Lv.88) @ Wharf Field 2–3" },
          ],
          rewards: [{ name: "Robin's Letter", kind: "item" }],
          images: [img(4), img(5)],
        },
        {
          id: "e2c1-art-stone-rod",
          title: "ส่งจดหมายรับคทา Art Stone Rod",
          npc: "Rosaline Gracia",
          location: "Oops Wharf",
          summary: ["ย้อนไปหา Rosaline Gracia พอส่งจดหมายก็จะได้คทาสวมใส่"],
          requirements: [{ name: "Robin's Letter", from: "เควส Love Hunter Robin" }],
          rewards: [
            {
              name: "Art Stone Rod",
              kind: "equip",
              note: "Lv.80 — MA 8~20, LK 7~13, Compound ได้ MP/LK 1–3 ช่อง (ค่อนข้างห่วย)",
            },
          ],
          images: [img(5)],
        },
        {
          id: "e2c1-marx",
          title: "Blacksmith Marx ขอไข่มุกกับเกล็ด",
          npc: "Don Giuvanni → Blacksmith Marx",
          location: "Oops Wharf / Gate of Mermaid Dungeon",
          summary: [
            "หา Don Giuvanni ที่ท่าเรือ จะได้เควสใหม่เพิ่มมา",
            "ไปหา Blacksmith Marx เขาจะขอไข่มุกดำกับขาว สีละ 3 เม็ด (ขุดได้รอบวังนางเงือก) กับเกล็ด 3 อัน",
          ],
          requirements: [
            { name: "Pearl", qty: "3 เม็ด", from: "ขุดรอบ Mermaid Palace Fields / Mermaid Dungeon" },
            { name: "Black Pearl", qty: "3 เม็ด", from: "ขุดรอบ Mermaid Palace Fields / Mermaid Dungeon" },
            { name: "Sturdy Scale", qty: "3 อัน", from: "ตี Merman Aqu (Lv.86) @ Mermaid Palace Field 4 – Rock Square" },
          ],
          rewards: [
            { name: "Blacksmith Marx Card", kind: "card", note: "Life +4" },
            { name: "Scabbard", kind: "item", note: "ฝักดาบที่พอดีกับ Sword of Vengeance" },
          ],
          images: [img(6), img(7), img(8)],
        },
        {
          id: "e2c1-blank-check",
          title: "ส่งดาบให้ Don Giuvanni รับตั๋วเปล่า",
          npc: "Don Giuvanni",
          location: "Oops Wharf",
          summary: ["หา Don Giuvanni ที่ท่าเรือ หลังจากส่งดาบจะได้รับตั๋ว 1 ใบ"],
          requirements: [{ name: "Scabbard", from: "เควส Blacksmith Marx" }],
          rewards: [{ name: "Blank Check", kind: "item" }],
          images: [img(8)],
        },
        {
          id: "e2c1-tear",
          title: "ห้องลับ — ตี Don Giuvanni เอาน้ำตา",
          npc: "Don Giuvanni",
          location: "Don Giuvanni's Secret Room",
          summary: [
            "พอคุยอีกรอบจะโดนวาร์ปมาห้องลับ ต้องตีเขาเพื่อเอาน้ำตา",
            "ได้มาก็เดินออกมาด้านล่าง แล้วกลับมาส่ง Don Giuvanni",
          ],
          requirements: [
            { name: "Giuvanni's Tear", from: "ตี Don Giuvanni (Lv.150) @ Don Giuvanni's Secret Room" },
          ],
          rewards: [{ name: "Tear Soaked Check", kind: "item" }],
          tips: ["Don Giuvanni ต้านทานทุกธาตุและทุกชนิดการโจมตี ดาเมจที่เข้าจะเหลือแค่ 2–5%"],
          images: [img(9)],
        },
        {
          id: "e2c1-voucher",
          title: "ส่งตั๋วให้ Kahlihara รับใบสัญญา",
          npc: "Kahlihara",
          location: "Gate of Mermaid Dungeon",
          summary: ["กลับไปหา Kahlihara หลังจากส่งจะได้รับการ์ดกับใบสัญญา"],
          requirements: [{ name: "Tear Soaked Check", from: "เควส Don Giuvanni" }],
          rewards: [
            { name: "Kahlihara Card", kind: "card", note: "Life +3" },
            {
              name: "Voucher of Promise",
              kind: "item",
              note: "เก็บไว้ให้ดี ต้องใช้ตอนบทที่ 3 และตอนขอความช่วยเหลือจาก Waterweed Witch",
            },
          ],
          images: [img(10)],
        },
        {
          id: "e2c1-clay-tablet",
          title: "แผ่นหินให้ Indiana John",
          npc: "Don Giuvanni → Indiana John",
          location: "Oops Wharf / Relics Field 2 – Hand of Giant",
          summary: [
            "หา Don Giuvanni ที่ท่าเรือ (เฉพาะเวลากลางคืนเท่านั้น) พอรับเควสได้ก็รีบทำเควสถัดไปให้ไว",
            "ตามหา Indiana John ส่งแผ่นหิน 5 แผ่น (ขุดรอบเขต Caballa)",
          ],
          requirements: [
            { name: "Clay Tablet", qty: "5 แผ่น", from: "ขุดรอบ Caballa Relics Fields" },
          ],
          rewards: [
            { name: "Indiana John Card", kind: "card", note: "Life +4" },
            { name: "Decoded Document", kind: "item" },
          ],
          images: [img(11), img(12)],
        },
        {
          id: "e2c1-cruise-ticket",
          title: "ปิดบทที่ 1 — ตั๋วไปเกาะลวงตา",
          npc: "Don Giuvanni → Skipper Min",
          location: "Oops Wharf",
          summary: [
            "หา Don Giuvanni ที่ท่าเรือ (เฉพาะเวลากลางคืนเท่านั้น) ส่งเอกสารที่ถอดรหัสแล้ว",
            "เป็นอันจบ Episode 2 Chapter 1 — Skipper Min จะวาร์ปพาไปเกาะลวงตา",
          ],
          requirements: [{ name: "Decoded Document", from: "เควส Indiana John" }],
          rewards: [
            { name: "Cruise Ticket", kind: "item", note: "ตั๋วเรือไป Mirage Island — ส่งให้ Skipper Min" },
            { name: "Don Giuvanni's Mask", kind: "equip", note: "Lv.1 — LK 1 (ของประดับ)" },
          ],
          images: [img(13)],
        },
      ],
    },
    {
      slug: "chapter-2",
      number: 2,
      title: "บทเพลงแห่งความทรงจำ",
      titleEn: "Chapter 2 — Song of Memories",
      area: "Gate of Mirage Island / Mirage Island Field 1–3",
      levelHint: "หลังจบ Chapter 1",
      intro:
        "Bard La Fimmel ที่ประตูเกาะจะให้ไล่เก็บไฟสองสีมาแต่งเป็นโน้ตเพลง แล้วปิดท้ายด้วยการหลอมสร้อยพระจันทร์ Crescent",
      steps: [
        {
          id: "e2c2-portina",
          title: "ส่งเกล็ดให้ Portina",
          npc: "Bard La Fimmel → Portina",
          location: "Gate of Mirage Island / Mirage Island Field 2 – Cliff of Fate",
          summary: [
            "คุย Bard La Fimmel แล้วรับเควสไปหา Portina",
            "ส่งเกล็ด 5 แผ่น — เกล็ดอันนี้ให้หามาสัก 10 อัน เพราะต้องใช้อีกในบทที่ 3",
          ],
          requirements: [
            { name: "Abiox", qty: "5 แผ่น", from: "ตี Sea Spirit (Lv.121) @ Mirage Island Field 3 – Fremeia" },
          ],
          rewards: [
            { name: "Portina Card", kind: "card", note: "Life +4" },
            { name: "Yellow Flame Incense", kind: "item" },
          ],
          tips: ["เก็บ Abiox เผื่อไว้ 10 อัน — ใช้ส่ง Sea Spirit Rumo กับ Lachesis อีกอย่างละแผ่น"],
          images: [img(14), img(15)],
        },
        {
          id: "e2c2-yellow-score",
          title: "ส่งไฟเหลืองรับโน้ตเพลง",
          npc: "Bard La Fimmel",
          location: "Gate of Mirage Island",
          summary: [
            "คุย Bard La Fimmel เพื่อส่งไฟ จะได้รับโน้ตเพลงสีเหลือง",
            "อีกรอบเขาจะให้ไปหา Nefertiti 2 ซึ่งจะส่งต่อไปทำเควสที่คนอื่น",
          ],
          requirements: [{ name: "Yellow Flame Incense", from: "เควส Portina" }],
          rewards: [
            { name: "Yellow Musical Score", kind: "item", note: "Compound LK ให้อุปกรณ์ Lv.71 ขึ้นไป" },
          ],
          images: [img(16)],
        },
        {
          id: "e2c2-fortune-teller",
          title: "ไหทองกับจานเงินให้ Fortune Teller",
          npc: "Fortune Teller",
          location: "Mirage Island Field 1 – Alteo",
          summary: [
            "ยายแกจะขอของเควส 2 อย่าง",
            "ไหทองขุดเขต 1 ส่วนจานเงินดรอปจากมอน",
          ],
          requirements: [
            { name: "Mirror Spring Water", from: "ขุดที่ Mirage Island Field 1 – Alteo" },
            { name: "Silver Platter", from: "ตี Werepot (Lv.98) @ Mirage Island Field 1 – Alteo" },
          ],
          rewards: [
            { name: "Fortune Teller Card", kind: "card", note: "Life +5" },
            { name: "Magical Silver Platter", kind: "item" },
          ],
          images: [img(17), img(18)],
        },
        {
          id: "e2c2-purple-score",
          title: "จานวิเศษแลกไฟม่วง",
          npc: "Nefertiti 2 → Bard La Fimmel",
          location: "Mirage Island Field 3 – Fremeia / Gate of Mirage Island",
          summary: [
            "กลับไปหา Nefertiti 2 หลังจากส่งจานวิเศษแล้วจะได้ไฟสีม่วง",
            "เอาไปส่ง Bard La Fimmel เพื่อรับโน้ตเพลงสีม่วง",
          ],
          requirements: [{ name: "Magical Silver Platter", from: "เควส Fortune Teller" }],
          rewards: [
            { name: "Purple Flame Incense", kind: "item" },
            { name: "Purple Musical Score", kind: "item", note: "Compound AC ให้อุปกรณ์ Lv.71 ขึ้นไป" },
          ],
          images: [img(19), img(20)],
        },
        {
          id: "e2c2-crescent",
          title: "ปิดบทที่ 2 — สร้อยพระจันทร์ Crescent",
          npc: "Bard La Fimmel",
          location: "Gate of Mirage Island",
          summary: [
            "คุยเควสอีกครั้ง คราวนี้เขาจะขอแบบละ 5 อัน",
            "หินพระจันทร์ขุดได้เขตเดียวที่ Fremeia ส่วนกระดูกปลาวาฬดรอปจาก Sea Hyena",
          ],
          requirements: [
            { name: "Moonlight Coral", qty: "5 อัน", from: "ขุดที่ Mirage Island Field 3 – Fremeia (เขตเดียว)" },
            { name: "Whale Baleen", qty: "5 อัน", from: "ตี Sea Hyena (Lv.126) @ Mirage Island Field 3 – Fremeia" },
          ],
          rewards: [
            { name: "La Fimmel Card", kind: "card", note: "Life +5" },
            {
              name: "Crescent",
              kind: "equip",
              note: "Lv.80 — DA 3, LK 3, Compound ได้ AC/DA/LK/HV 3 ช่อง",
            },
          ],
          images: [img(21), img(22)],
        },
      ],
    },
    {
      slug: "chapter-3",
      number: 3,
      title: "อารัมภบทแห่งวิญญาณต้องสาป",
      titleEn: "Chapter 3 — Prelude of The Cursed Soul",
      area: "Mirage Island Field 1–3 / Mirage Island Dungeon 1–2 / Coral Beach",
      levelHint: "หลังจบ Chapter 2",
      intro:
        "บทที่ยาวที่สุดของ EP 2 ไล่ทำเควสให้สามพี่น้องแห่งโชคชะตา Clotho / Lachesis / Nefertiti จบแล้วได้กล่องสมบัติที่เปิดออกมาเป็นอาวุธ Mirage",
      steps: [
        {
          id: "e2c3-choco",
          title: "เตรียม Dark Choco Piece 3 ชิ้น",
          npc: "Compounder Paul",
          location: "Coral Beach – Blooming Cora Shop",
          summary: [
            "ก่อนรับเควสให้ไป Coral Beach เพื่อสร้าง Dark Choco Piece 3 ชิ้น",
            "ผสมกับ Compounder Paul โอกาสพื้นฐาน 40% ค่าผสมครั้งละ 20g",
            "สูตร: Cacao 2 + Mysterious Milk 1",
          ],
          requirements: [
            { name: "Cacao", qty: "2 ผล/ครั้ง", from: "ขุดที่ Coral Beach Fields หรือ Coral Beach – Dark Cave" },
            { name: "Mysterious Milk", qty: "1 ขวด/ครั้ง", from: "ตี Clione (Lv.10) @ Coral Beach Field 3 – Sunny Beach" },
          ],
          rewards: [{ name: "Dark Choco Piece", qty: "3 ชิ้น", kind: "item", note: "ฟื้น HP 300" }],
          images: [img(23), img(24)],
        },
        {
          id: "e2c3-enkicladus-choco",
          title: "ส่งช็อกโกแลตให้ Enkicladus 1",
          npc: "Enkicladus 1 → Knight Scar",
          location: "Mirage Island Field 2 – Cliff of Fate",
          summary: [
            "หลังจากส่ง Dark Choco 3 ชิ้น จะได้ Dark Attribute Stone",
            "ใช้สำหรับ Compound Golden Lion Shield",
            "คุย Knight Scar เขตเดียวกัน เพื่อรับเควสหาหอกกับยาพิษ",
          ],
          requirements: [{ name: "Dark Choco Piece", qty: "3 ชิ้น", from: "ผสมที่ Compounder Paul" }],
          rewards: [{ name: "Dark Attribute Stone", kind: "item", note: "ใช้ Compound Golden Lion Shield" }],
          images: [img(25)],
        },
        {
          id: "e2c3-poison",
          title: "ยาพิษของ Kahlihara",
          npc: "Kahlihara",
          location: "Gate of Mermaid Dungeon",
          summary: [
            "หอกหาจาก Sharp Spear ที่ดรอปจาก Fabilsag",
            "กลับไปหา Kahlihara นางจะขอของ 3 อย่างเพื่อสร้างยา",
          ],
          requirements: [
            { name: "Sharp Spear", from: "ตี Fabilsag (Lv.106) @ Mirage Island Field 1 – Alteo" },
            { name: "Voucher of Promise", from: "เควส Kahlihara ในบทที่ 1" },
            { name: "Fabilsag's Stinger", qty: "5 อัน", from: "ตี Fabilsag G (Lv.110) @ Mirage Island Field 1 – Alteo" },
            { name: "Venomous Canine", qty: "5 อัน", from: "ตี Uraeus (Lv.34) @ Pyramid Dungeon 2 – Hall of Harpy" },
          ],
          rewards: [
            { name: "Kahlihara Card", kind: "card", note: "Life +3" },
            { name: "Witch's Deadly Poison", kind: "item" },
          ],
          images: [img(26), img(27), img(28), img(29)],
        },
        {
          id: "e2c3-knight-scar",
          title: "ส่งหอกกับยาพิษให้ Knight Scar",
          npc: "Knight Scar",
          location: "Mirage Island Field 2 – Cliff of Fate",
          summary: ["กลับไป Knight Scar หลังจากส่งของแล้วจะได้การ์ดกับหินธาตุแสง"],
          requirements: [
            { name: "Sharp Spear", from: "ตี Fabilsag (Lv.106)" },
            { name: "Witch's Deadly Poison", from: "เควส Kahlihara" },
          ],
          rewards: [
            { name: "Knight Scar Card", kind: "card", note: "Life +4" },
            { name: "Light Attribute Stone", kind: "item" },
          ],
          images: [img(30)],
        },
        {
          id: "e2c3-lily",
          title: "ช่อดอกไม้ให้ Enkicladus 1",
          npc: "Enkicladus 1",
          location: "Mirage Island Field 2 – Cliff of Fate",
          summary: [
            "เขาจะขอช่อดอกไม้ ซึ่งตกยากมาก",
            "White Lily Bouquet ดรอปจาก Sea Spirit (Lv.121)",
          ],
          requirements: [
            { name: "White Lily Bouquet", from: "ตี Sea Spirit (Lv.121) @ Mirage Island Field 3 – Fremeia", note: "ตกยากมาก" },
          ],
          rewards: [
            { name: "Enkicladus 1 Card", kind: "card", note: "Life +6" },
            { name: "Ember of Memory 1", kind: "item" },
            { name: "Mirage Drill", kind: "item", note: "Lv.100 — ขุดลึก 250m, ความทน 800, Stage 4" },
          ],
          images: [img(31), img(32)],
        },
        {
          id: "e2c3-clotho",
          title: "ลูกแก้วให้ Clotho",
          npc: "Sea Spirit Rumo → Clotho",
          location: "Mirage Island Field 2 / Mirage Island Dungeon",
          summary: [
            "คุย Sea Spirit Rumo ข้างกัน ส่ง Abiox 1 แผ่น (ที่สะสมไว้ก่อนหน้า) จะวาร์ปเข้า Mirage Island Dungeon",
            "ระหว่างทางให้หาลูกแก้ว 5 เม็ดรายทาง แล้วเดินหา Clotho",
          ],
          requirements: [
            { name: "Abiox", qty: "1 แผ่น", from: "ตี Sea Spirit (Lv.121) — สะสมไว้ก่อนหน้า" },
            {
              name: "Fluorescent Marble",
              qty: "5 เม็ด",
              from: "ตี Dark Hollow (Lv.122) @ Mirage Island Field 2 / Mirage Island Dungeon 2",
            },
          ],
          rewards: [
            { name: "Clotho Card", kind: "card", note: "Life +5" },
            { name: "Cursed Scroll", kind: "item" },
          ],
          images: [img(32), img(33), img(34)],
        },
        {
          id: "e2c3-rumo-anklet",
          title: "สร้อยหอยให้ Sea Spirit Rumo",
          npc: "Nefertiti 2 → Sea Spirit Rumo",
          location: "Mirage Island Field 3 – Fremeia",
          summary: [
            "กลับไปหา Nefertiti 2 รับเควสไว้ก่อน",
            "Sea Spirit Rumo ข้างกันจะให้ไปหาสร้อยหอย 5 อัน",
          ],
          requirements: [
            {
              name: "Anklet of Ocean Spirit",
              qty: "5 อัน",
              from: "ตี Sea Spirit (Lv.121) @ Mirage Island Field 3 – Fremeia",
            },
          ],
          rewards: [
            { name: "Sea Spirit Rumo Card", kind: "card", note: "Life +3" },
            { name: "Earthen Fate Necklace", kind: "item" },
          ],
          images: [img(34), img(35), img(36)],
        },
        {
          id: "e2c3-water-stone",
          title: "ส่งสร้อยรับหินธาตุน้ำ",
          npc: "Nefertiti 2",
          location: "Mirage Island Field 3 – Fremeia",
          summary: ["กลับไปหา Nefertiti 2 หลังส่งสร้อยไปจะได้หินธาตุน้ำ"],
          requirements: [{ name: "Earthen Fate Necklace", from: "เควส Sea Spirit Rumo" }],
          rewards: [{ name: "Water Attribute Stone", kind: "item" }],
          images: [img(36)],
        },
        {
          id: "e2c3-conch",
          title: "หอย 5 อันแลก Mirage Shield",
          npc: "Enkicladus 1",
          location: "Mirage Island Field 3 – Fremeia",
          summary: ["Enkicladus 1 เขตเดียวกันจะให้ไปหาหอย 5 อัน"],
          requirements: [
            { name: "Ocean Conch", qty: "5 อัน", from: "ตี Sea Hyena (Lv.126) @ Mirage Island Field 3 – Fremeia" },
          ],
          rewards: [
            { name: "Mirage Shield", kind: "equip", note: "Lv.110 — DP 160 (120~216)" },
          ],
          images: [img(37), img(38)],
        },
        {
          id: "e2c3-robin-secret",
          title: "ของขุดให้ Love Hunter Robin",
          npc: "Love Hunter Robin",
          location: "Mirage Island Field 1 – Alteo",
          summary: [
            "ไปหา Love Hunter Robin หาของขุด 2 อย่าง ขุดเขตนั้นเลย",
            "หลังส่งแล้วจะได้รางวัลและโดนวาร์ปไป Mirage Island Dungeon 1 – Ocean's End",
          ],
          requirements: [
            { name: "Ancient Feather Pen", from: "ขุดที่ Mirage Island Field 1 – Alteo" },
            { name: "Papyrus", from: "ขุดที่ Mirage Island Field 1 – Alteo" },
          ],
          rewards: [
            { name: "Love Hunter Robin Card", kind: "card", note: "Life +3" },
            { name: "Contract of Secrecy", kind: "item", note: "ใช้วาร์ปไป Mirage Island Dungeon 1 – Ocean's End" },
          ],
          images: [img(38), img(39)],
        },
        {
          id: "e2c3-bloody-rune",
          title: "Bloody Rune of Fate — ด่านขุด 1.3%",
          npc: "Nefertiti 2 → Enkicladus 2",
          location: "Mirage Island Dungeon 1 – Ocean's End",
          summary: [
            "ตามหา Nefertiti 2 รับเควสไว้ก่อน แล้วคุย Enkicladus 2 ข้างกัน",
            "หินนี้มีโอกาสขุดได้แค่ 1.3% เท่านั้น อาจจะเสียเวลาเยอะมากแล้วแต่ดวง",
          ],
          requirements: [
            {
              name: "Bloody Rune of Fate",
              from: "ขุดที่ Mirage Island Dungeon 1 – Ocean's End",
              note: "โอกาสขุดได้ 1.3%",
            },
          ],
          rewards: [
            { name: "Enkicladus 2 Card", kind: "card", note: "Life +5" },
            { name: "Mirage Helm", kind: "equip", note: "Lv.110 — MD 160 (120~216)" },
            { name: "Sky's Fate Necklace", kind: "item" },
          ],
          images: [img(39), img(40), img(41)],
        },
        {
          id: "e2c3-dark-necklace",
          title: "แปลงสร้อยกับ Nefertiti 2",
          npc: "Nefertiti 2",
          location: "Mirage Island Dungeon 1 – Ocean's End",
          summary: ["คุย Nefertiti 2 เพื่อแปลงสร้อย"],
          requirements: [{ name: "Sky's Fate Necklace", from: "เควส Enkicladus 2" }],
          rewards: [{ name: "Dark Earth Fate Necklace", kind: "item" }],
          images: [img(41)],
        },
        {
          id: "e2c3-lachesis",
          title: "Shard of Spirit ให้ Lachesis",
          npc: "Lachesis",
          location: "Mirage Island Dungeon 2 – Deepest Cave",
          summary: [
            "ไปหาของมาก่อนเพื่อความสะดวก ไฟอันนี้ % ตกน้อยมาก อาจใช้เวลานาน",
            "ย้อนกลับไปหา Lachesis ที่ส่ง Abiox 1 แผ่นก่อนหน้า",
          ],
          requirements: [
            { name: "Abiox", qty: "1 แผ่น", from: "ตี Sea Spirit (Lv.121) — สะสมไว้ก่อนหน้า" },
            {
              name: "Shard of Spirit",
              from: "ตี Sea Hyena (Lv.126) @ Mirage Island Field 3 / Dungeon 1",
              note: "% ตกน้อยมาก",
            },
          ],
          rewards: [
            { name: "Lachesis Card", kind: "card", note: "Life +4" },
            { name: "Blessed Scroll", kind: "item" },
          ],
          images: [img(42), img(43)],
        },
        {
          id: "e2c3-finish",
          title: "ปิด EP 2 — กล่องสมบัติโบราณ",
          npc: "Nefertiti 2",
          location: "Mirage Island Dungeon 1 – Ocean's End",
          summary: [
            "สุดท้าย คุย Nefertiti 2 เพื่อส่งเควสทั้งหมดที่ได้มา เป็นอันจบ Chapter 3",
            "Ancient Treasure Box เปิดได้อาวุธ Mirage อย่างใดอย่างหนึ่ง",
          ],
          requirements: [
            { name: "Cursed Scroll", from: "เควส Clotho" },
            { name: "Blessed Scroll", from: "เควส Lachesis" },
            { name: "Dark Earth Fate Necklace", from: "เควส Nefertiti 2" },
          ],
          rewards: [
            { name: "Nefertiti 2 Card", kind: "card", note: "Life +5" },
            { name: "Ember of Memory 2", kind: "item" },
            {
              name: "Ancient Treasure Box",
              kind: "item",
              note: "เปิดได้ 1 อย่างจาก Mirage Sword / Mirage Gun / Mirage Staff (Lv.110)",
            },
          ],
          images: [img(44), img(45)],
        },
      ],
    },
  ],
};
