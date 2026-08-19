import type { Episode } from "./types";

const img = (n: number) => `/images/ep0/ep0-${String(n).padStart(3, "0")}.jpg`;

export const ep0: Episode = {
  slug: "ep0",
  group: "ep",
  number: 0,
  title: "จุดเริ่มต้นของการผจญภัย",
  titleEn: "Episode 0 — The Start of an Adventure",
  tagline:
    "เควสสายหลักตั้งแต่ก้าวแรกที่ Coral Town จนข้ามถ้ำไปถึง Desert Beach และเก็บ Welcome Seal ครบ 8 อัน",
  areas: [
    "Coral Town – Blooming Cora",
    "Coral Beach Field 1–3",
    "Gate of Desert Beach",
    "Desert Beach / Paradise",
    "Desert Beach Field 1–3",
  ],
  status: "ready",
  notes: [
    "Welcome Seal ทั้ง 8 อันมีเควสสายตัวละครแถมมาด้วย — NPC คนเดียวกันจะมีเควสเวอร์ชันเฉพาะสายให้ทำต่อ ได้ Seal เพิ่มอีกใบพร้อมเพ็ทกับแหวนประจำสาย",
    "500 Galder Coupon ที่ได้จากเควสช่วงต้นควรเก็บไว้ อย่าเพิ่งกดใช้",
  ],
  chapters: [
    {
      slug: "chapter-1",
      number: 1,
      title: "ก้าวแรกที่ Coral Town",
      titleEn: "Chapter 1 — The Start of an Adventure",
      area: "Coral Town – Blooming Cora / Coral Beach Field 1–3",
      levelHint: "Lv.1 ขึ้นไป",
      intro:
        "บทเปิดของเกม ไล่คุยกับ NPC รอบเมือง Coral Town แล้วออกไปสนามหญ้าใกล้ ๆ ทีละเขต จบบทจะได้กระเป๋าเพิ่มน้ำหนักกับสมุดคู่มือครบชุด",
      steps: [
        {
          id: "c1-heidi",
          title: "ลงทะเบียนนักผจญภัยกับ Heidi",
          npc: "Heidi",
          location: "Coral Town – Blooming Cora",
          summary: [
            "คุยกับ Heidi เพื่อรับ Registration Form",
            "เอาไปหา Bunny Maid จบเควสจะได้ชุด Rookie Set",
          ],
          requirements: [{ name: "Registration Form", from: "คุยกับ Heidi" }],
          rewards: [
            { name: "Rookie Sword", kind: "equip", note: "ชุด Rookie Set — Hat / Sword / Shield" },
          ],
          images: [img(1)],
        },
        {
          id: "c1-bunny-maid",
          title: "หา Carrot ให้ Bunny Maid",
          npc: "Bunny Maid",
          location: "Coral Town – Blooming Cora",
          summary: [
            "Bunny Maid จะให้ไปหา Carrot 2 ชิ้น พอเอามาส่งจะได้สมุด",
            "Baby Carrot ดรอปจาก Torobbie ที่ Coral Beach Field 1 – Blue Wave",
          ],
          requirements: [
            { name: "Baby Carrot", qty: "2 ชิ้น", from: "ตี Torobbie (Lv.1) @ Coral Beach Field 1 – Blue Wave" },
          ],
          rewards: [{ name: "Level Up Guide", kind: "book" }],
          images: [img(2)],
        },
        {
          id: "c1-winnie",
          title: "รับเพ็ทตัวแรกจาก Winnie",
          npc: "Winnie",
          location: "Coral Town – Blooming Cora",
          summary: ["ไปหา Winnie คุยจบรับ Young Egg Pet"],
          rewards: [
            {
              name: "Young Egg Pet",
              kind: "pet",
              note: "Lv.1 — Talent: LK / LK 1, DP 2",
            },
          ],
          images: [img(3)],
        },
        {
          id: "c1-deen",
          title: "Lifeguard Deen — Blue Wave",
          npc: "Lifeguard Deen",
          location: "Coral Beach Field 1 – Blue Wave",
          summary: [
            "ครั้งแรกคุยจบจะได้ Lucky Potion สีละ 10 ขวด กับ Recovery Guide",
            "คุยอีกครั้งจะให้ตี Tottochi 5 ตัวมาส่ง",
          ],
          requirements: [
            { name: "ตี Tottochi", qty: "5 ตัว", from: "Coral Beach Field 1 – Blue Wave (รอบสอง)" },
          ],
          rewards: [
            { name: "Lucky Potion", qty: "สีละ 10 ขวด", kind: "potion" },
            { name: "Recovery Guide", kind: "book" },
            { name: "500 Galder Coupon", qty: "5 เหรียญ", kind: "money", note: "ควรเก็บไว้อย่ากด" },
          ],
          images: [img(4)],
        },
        {
          id: "c1-tinnie",
          title: "Tinnie — Passionate Sun",
          npc: "Tinnie",
          location: "Coral Beach Field 2 – Passionate Sun",
          summary: [
            "ครั้งแรกจะได้ Lucky Potion สีละ 10 ขวด กับเงิน 2,000 Galder",
            "ครั้งที่สองให้ตี Bad Fury 5 ตัว",
          ],
          requirements: [
            { name: "ตี Bad Fury", qty: "5 ตัว", from: "Coral Beach Field 2 – Passionate Sun (รอบสอง)" },
          ],
          rewards: [
            { name: "Lucky Potion", qty: "สีละ 10 ขวด", kind: "potion" },
            { name: "2,000 Galder", kind: "money" },
            { name: "500 Galder Coupon", qty: "5 เหรียญ", kind: "money", note: "ควรเก็บไว้อย่ากด" },
          ],
          images: [img(5)],
        },
        {
          id: "c1-bean",
          title: "Lifeguard Bean — Sunny Beach",
          npc: "Lifeguard Bean",
          location: "Coral Beach Field 3 – Sunny Beach",
          summary: [
            "ครั้งแรกจะได้ Lucky Potion สีละ 10 ขวด",
            "ครั้งที่ 2 ให้หา Cool Ice 5 ก้อน ตกจาก Blue Penguin",
          ],
          requirements: [
            { name: "Cool Ice", qty: "5 ก้อน", from: "ตี Blue Penguin (Lv.6) @ Coral Beach Field 3 – Sunny Beach" },
          ],
          rewards: [{ name: "Lucky Potion", qty: "สีละ 10 ขวด", kind: "potion" }],
          images: [img(6)],
        },
        {
          id: "c1-finish",
          title: "ปิดบทที่ 1 — รับกระเป๋าเพิ่มน้ำหนัก",
          npc: "Lifeguard Bean",
          location: "Coral Beach Field 3 – Sunny Beach",
          summary: [
            "จะได้รับ Accessorie เพิ่มน้ำหนัก 200 กับสมุด",
            "คุยด้วยอีกรอบ เป็นอันจบภารกิจ Episode 0 Chapter 1",
          ],
          rewards: [
            { name: "Pocket Pouch", kind: "equip", note: "Lv.10 — เพิ่มน้ำหนักที่พกได้ 200" },
            { name: "Shortcut Guide", kind: "book" },
          ],
          images: [img(7)],
        },
      ],
    },
    {
      slug: "chapter-2",
      number: 2,
      title: "ข้ามถ้ำสู่ทะเลทราย",
      titleEn: "Chapter 2 — Don Giuvanni's Push",
      area: "Gate of Desert Beach / Desert Beach / Paradise Shop",
      levelHint: "หลังจบ Chapter 1",
      intro:
        "บทนี้เป็นการสอนระบบขุดกับระบบผสมของ เดินทะลุถ้ำไปฝั่งทะเลทราย รับสว่านกับเพ็ท Peng แล้วไล่ทำเควสผสมยาและ Refine อาวุธ",
      steps: [
        {
          id: "c2-don",
          title: "เดินทะลุถ้ำไปหา Don Giuvanni",
          npc: "Don Giuvanni / Driller Marky",
          location: "Gate of Desert Beach",
          summary: [
            "เดินทะลุถ้ำไปหา Don Giuvanni ที่ Gate of Desert Beach ครั้งแรกจะได้เงิน 4,000 Galder",
            "Driller Marky จะให้ขุด Tanning Oil 2 ขวด ขุดแถวนี้ได้เลย",
          ],
          requirements: [{ name: "Tanning Oil", qty: "2 ขวด", from: "ขุดแถว Gate of Desert Beach" }],
          rewards: [{ name: "4,000 Galder", kind: "money" }],
          images: [img(8)],
        },
        {
          id: "c2-peng",
          title: "รับ Peng Pet และสว่านขุด",
          npc: "Driller Marky",
          location: "Gate of Desert Beach",
          summary: [
            "ส่ง Tanning Oil แล้วจะได้ Peng Pet กับสมุดสอนขุด",
            "Driller Marky รับสว่านได้ไม่จำกัดจำนวน",
          ],
          rewards: [
            {
              name: "Peng",
              kind: "pet",
              note: "Lv.15 — Talent: MP, DA, HP / MP 30, น้ำหนัก 300, DA 2, HP 30, ฟื้น HP 2 ครั้ง",
            },
            { name: "Drilling for Dummies", kind: "book" },
            { name: "Basic Drill", kind: "item", note: "ขุดลึก 20m, ความทน 250 — ขอเพิ่มได้ไม่จำกัด" },
          ],
          images: [img(9)],
        },
        {
          id: "c2-materials",
          title: "รับวัตถุดิบทำยาจาก Don Giuvanni",
          npc: "Don Giuvanni",
          location: "Gate of Desert Beach",
          summary: ["คุย Don Giuvanni รับรางวัลอย่างละ 5 ชิ้น — ห้ามทิ้ง เพราะต้องใช้ทำยาต่อ"],
          rewards: [
            { name: "Oasis Water", qty: "5 ชิ้น", kind: "item" },
            { name: "Distilled Water", qty: "5 ชิ้น", kind: "item" },
            { name: "Empty Potion Bottle", qty: "5 ชิ้น", kind: "item" },
          ],
          images: [img(10)],
        },
        {
          id: "c2-robert-potion",
          title: "ผสม Desert Potion กับ Compounder Paul",
          npc: "Officer Robert / Compounder Paul",
          location: "Desert Beach / Paradise Shop",
          summary: [
            "วาร์ปไปหา Officer Robert รอบแรกจะได้ของแบบเดียวกับเควสข้างบนเพิ่มมาอีกอย่างละ 5 ชิ้น",
            "รอบสองเอาของพวกนั้นไปทำ Desert Potion 1 ขวด ผสมที่ Compounder Paul ใน Shop",
            "โอกาสสำเร็จพื้นฐาน 45% ใช้แค่ขวดเดียว โอกาส 1 ใน 10 ไม่ยาก",
          ],
          requirements: [
            { name: "Oasis Water", qty: "5 ชิ้น", from: "Officer Robert" },
            { name: "Distilled Water", qty: "5 ชิ้น", from: "Officer Robert" },
            { name: "Empty Potion Bottle", qty: "5 ชิ้น", from: "Officer Robert" },
          ],
          rewards: [{ name: "Desert Potion", qty: "1 ขวด", kind: "potion" }],
          images: [img(11)],
        },
        {
          id: "c2-life-vest",
          title: "ส่งยาแล้วรับเสื้อชูชีพไป Compound",
          npc: "Officer Robert → Alchemist Nate",
          location: "Desert Beach / Paradise Shop",
          summary: [
            "ออกมาส่ง Officer Robert จะได้ของ 2 อย่าง",
            "เข้าไปหา Alchemist Nate ใน Paradise Shop เพื่อ Compound เสื้อ",
          ],
          rewards: [
            { name: "Life Vest", kind: "equip", note: "Lv.10 — LK 1, DP 21 / Compound ได้: MD, DP, Soil Resist, Water Resist" },
            { name: "Hard Scales", kind: "item", note: "Compound เพิ่ม DP ให้อุปกรณ์" },
          ],
          images: [img(12)],
        },
        {
          id: "c2-nate",
          title: "รับใบรับรองจาก Alchemist Nate",
          npc: "Alchemist Nate → Officer Robert",
          location: "Paradise Shop / Desert Beach",
          summary: [
            "Compound เสร็จคุยอีกรอบรับรางวัล",
            "ออกมาส่ง Officer Robert จะได้ยา B แบบละ 20 ขวด กับ Wooden Sword ที่ใช้ในเควสถัดไป",
          ],
          rewards: [
            { name: "Nate's Certification", kind: "item" },
            { name: "Mature Compounding Guide", kind: "book" },
            { name: "ยา B", qty: "แบบละ 20 ขวด", kind: "potion" },
            { name: "Wooden Sword", kind: "equip", note: "ใช้ต่อในเควส Refine" },
          ],
          images: [img(13)],
        },
        {
          id: "c2-marx",
          title: "Refine ดาบกับ Blacksmith Marx",
          npc: "Blacksmith Marx → Officer Robert",
          location: "Paradise Shop / Desert Beach",
          summary: [
            "Blacksmith Marx จะให้หา Bronze Gemstone 7 ก้อน ไปขุดเหมืองขวาของเมืองเขต 1 (จุดรูปจอบ)",
            "พอส่งเสร็จทำการ Refine ดาบอันนั้น +1",
            "ออกมาส่ง Officer Robert เป็นอันจบภารกิจ Episode 0 Chapter 2",
          ],
          requirements: [
            { name: "Bronze Gemstone", qty: "7 ก้อน", from: "ขุดเหมืองขวาของเมืองเขต 1 (จุดรูปจอบ)" },
          ],
          rewards: [
            { name: "Refining Guide", kind: "book" },
            { name: "ชุบชีวิตตอนตาย", qty: "5 แผ่น", kind: "item" },
            { name: "Hologram Port (Ep0)", kind: "item" },
          ],
          images: [img(14)],
        },
      ],
    },
    {
      slug: "chapter-3",
      number: 3,
      title: "ล่า Welcome Seal 8 อัน",
      titleEn: "Chapter 3 — Our Prologue",
      area: "Paradise / Desert Beach Field 1–3",
      levelHint: "หลังจบ Chapter 2",
      intro:
        "บทสุดท้ายของ EP 0 คือภารกิจสะสม Welcome Seal ทั้งหมด 8 อัน NPC ทุกตัวอยู่รอบเมือง Paradise ทำเรียงกันไปตามลำดับจะง่ายที่สุด ทุกอันมีเควสเวอร์ชันเฉพาะสายตัวละครแถมมาด้วย ทำครบแล้วรับ Wing Port และ Health Charm",
      steps: [
        {
          id: "c3-andrew",
          title: "รับภารกิจ Welcome Seal จาก Andrew",
          npc: "Andrew",
          location: "Paradise",
          summary: [
            "ไปหา Andrew ที่ Paradise เพื่อรับภารกิจ Welcome Seal ทั้งหมด 8 อัน",
            "NPC อยู่รอบเมือง ทำเรียงกันไปตามลำดับจะง่ายที่สุด",
          ],
          rewards: [
            { name: "Wing Port (Paradise)", qty: "10 อัน", kind: "item" },
            {
              name: "Health Charm",
              kind: "equip",
              note: "Lv.20 — MD 8, HP 320, DP 8 / Compound ได้: DP, HV, Water Resist, Air Resist",
            },
          ],
          images: [img(15)],
        },
        {
          id: "c3-seal-1",
          title: "Seal 1 — ช่อดอกไม้ให้ Steve Ryu",
          npc: "Steve Ryu",
          location: "Paradise (รอบเมือง)",
          summary: ["คุย Steve Ryu แล้วหา Bouquet 3 ช่อมาส่ง", "Bouquet ดรอปจาก Hula Octopus"],
          requirements: [
            { name: "Bouquet", qty: "3 ช่อ", from: "ตี Hula Octopus (Lv.25) @ Desert Beach Field 2 – Sand Palace" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Bunny Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
          ],
          images: [img(16)],
        },
        {
          id: "c3-bunny",
          title: "สาย Bunny — ลิปสติกให้ Mermaid Babe",
          npc: "Steve Ryu → Mermaid Babe",
          location: "Desert Beach Field 2 – Sand Palace",
          classOnly: "Bunny",
          summary: [
            "Steve Ryu จะให้ Written Challenge มาใช้ต่อ",
            "ไปหา Mermaid Babe ที่ Desert Beach Field 2 – Sand Palace นางขอลิปสติก 3 อัน ขุดเขตนี้ได้เลย",
            "นางจะให้ใบเควส Handkerchief of Challenge กลับไปส่ง Steve Ryu เพื่อจบเควส",
          ],
          requirements: [
            { name: "Red Lipstick", qty: "3 อัน", from: "ขุดที่ Desert Beach Field 2 – Sand Palace" },
            { name: "Handkerchief of Challenge", qty: "1 ใบ", from: "Mermaid Babe" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Baby Bunny", kind: "pet", note: "Lv.25 — Talent: AP, AC / AP 24, AC 4, ฟื้น HP 2 ครั้ง" },
            { name: "Strong Ring", kind: "equip", note: "Lv.15 — AP 28, AC 1" },
            { name: "Bouquet", kind: "item", note: "โยนทิ้งได้เลย" },
          ],
          images: [img(17), img(18)],
        },
        {
          id: "c3-seal-2",
          title: "Seal 2 — ขุดรูปภาพให้ Don Giuvanni",
          npc: "Don Giuvanni",
          location: "Paradise (รอบเมือง)",
          summary: ["คุย Don Giuvanni แล้วไปขุดรูปภาพ 1 ใบ", "ขุดได้ที่ Desert Beach Field 1 – Delta Island"],
          requirements: [
            { name: "Jenny's Photo B", qty: "1 ใบ", from: "ขุดที่ Desert Beach Field 1 – Delta Island" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Girl Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
            { name: "ยา B", qty: "10 ขวด", kind: "potion" },
          ],
          images: [img(19)],
        },
        {
          id: "c3-cat",
          title: "สาย Cat — หอย 3 อันให้ Don Giuvanni",
          npc: "Don Giuvanni",
          location: "Desert Beach Field 1 – Delta Island",
          classOnly: "Cat",
          summary: [
            "คุย Don Giuvanni แล้วหา Clam Meat 3 อันมาส่ง",
            "Clam Meat ดรอปจาก Shell Trap ที่ Delta Island",
          ],
          requirements: [
            { name: "Clam Meat", qty: "3 อัน", from: "ตี Shell Trap (Lv.19) @ Desert Beach Field 1 – Delta Island" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Director's Letter", kind: "item" },
            { name: "Kitten", kind: "pet", note: "Lv.25 — Talent: AP, HP, HV / AP 16, HP 80, DP 8, HV 3" },
            { name: "Solid Ring", kind: "equip", note: "Lv.15 — HP 90, HV 2" },
          ],
          images: [img(20), img(21)],
        },
        {
          id: "c3-seal-3",
          title: "Seal 3 — ขนเป็ดให้ Clever Owl",
          npc: "Clever Owl",
          location: "Paradise (รอบเมือง)",
          summary: ["คุย Clever Owl แล้วหาขนเป็ด 3 อัน", "Golden Mole Feather ดรอปจาก Golden Mole"],
          requirements: [
            { name: "Golden Mole Feather", qty: "3 อัน", from: "ตี Golden Mole (Lv.20) @ Desert Beach Field 1 – Delta Island" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Sheep Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
          ],
          images: [img(22)],
        },
        {
          id: "c3-sheep",
          title: "สาย Sheep — จดหมายให้ Clever Owl",
          npc: "Clever Owl",
          location: "Desert Beach Field 1 – Delta Island",
          classOnly: "Sheep",
          summary: [
            "คุย Clever Owl แล้วหาจดหมาย 1 ใบ",
            "Magic Sealed Letter ขุดได้ที่ Desert Beach Field 1 – Delta Island",
          ],
          requirements: [
            { name: "Magic Sealed Letter", qty: "1 ใบ", from: "ขุดที่ Desert Beach Field 1 – Delta Island" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Unsealed Letter", kind: "item" },
            { name: "Lamb", kind: "pet", note: "Lv.25 — Talent: MP, MA, LK / MP 60, MA 3, MD 4, LK 1" },
            { name: "Smart Ring", kind: "equip", note: "Lv.15 — MP 90, MA 2" },
          ],
          images: [img(23), img(24)],
        },
        {
          id: "c3-seal-4",
          title: "Seal 4 — ขุดเกลือให้ Kristoffer J.",
          npc: "Kristoffer J.",
          location: "Paradise (รอบเมือง)",
          summary: ["คุย Kristoffer J. แล้วไปขุดเกลือ 3 อัน", "ขุดได้ที่ Desert Beach Field 1 – Delta Island"],
          requirements: [
            { name: "Salt", qty: "3 อัน", from: "ขุดที่ Desert Beach Field 1 – Delta Island" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Salted Dry Fish", qty: "20 แผ่น", kind: "item", note: "ปลาแห้ง ฟื้น HP 120" },
            { name: "Fox Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
          ],
          images: [img(25)],
        },
        {
          id: "c3-fox",
          title: "สาย Fox — หาหนอน 3 ตัวให้ Kristoffer J.",
          npc: "Kristoffer J.",
          location: "Desert Beach Field 1 – Delta Island",
          classOnly: "Fox",
          summary: ["คุย Kristoffer J. แล้วหาหนอน 3 ตัว", "Earthworm ดรอปจาก Golden Mole"],
          requirements: [
            { name: "Earthworm", qty: "3 ตัว", from: "ตี Golden Mole (Lv.20) @ Desert Beach Field 1 – Delta Island" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Envelope with Photo", kind: "item" },
            { name: "Fox Pup", kind: "pet", note: "Lv.25 — Talent: AP, DA, LK / AP 12, น้ำหนัก 150, DA 2, LK 2" },
            { name: "Accurate Ring", kind: "equip", note: "Lv.15 — น้ำหนัก 160, DA 2" },
          ],
          images: [img(26), img(27)],
        },
        {
          id: "c3-seal-5",
          title: "Seal 5 — เนื้อแมงป่องให้ Dorothy",
          npc: "Dorothy",
          location: "Paradise (รอบเมือง)",
          summary: ["คุย Dorothy แล้วใช้เนื้อแมงป่อง 3 อัน", "Scorpion Jerky ดรอปจาก Sea Scorpion"],
          requirements: [
            { name: "Scorpion Jerky", qty: "3 อัน", from: "ตี Sea Scorpion (Lv.22) @ Desert Beach Field 3 – Statue of Anubis" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Lion Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
          ],
          images: [img(28)],
        },
        {
          id: "c3-lion",
          title: "สาย Lion — กิฟดาว 3 อันให้ Dorothy",
          npc: "Dorothy",
          location: "Desert Beach Field 1 – Delta Island",
          classOnly: "Lion",
          summary: ["คุย Dorothy แล้วตามหากิฟดาว 3 อัน", "Twinkle Star ดรอปจาก Fanta Slime"],
          requirements: [
            { name: "Twinkle Star", qty: "3 อัน", from: "ตี Fanta Slime (Lv.18) @ Desert Beach Field 1 – Delta Island" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Child's Letter", kind: "item" },
            { name: "Lion Cub", kind: "pet", note: "Lv.25 — Talent: AC, DA, LK / AC 2, DA 2, LK 1" },
            { name: "Accurate Ring", kind: "equip", note: "Lv.15 — น้ำหนัก 160, DA 2" },
          ],
          images: [img(29), img(30)],
        },
        {
          id: "c3-seal-6",
          title: "Seal 6 — แผ่น CD ให้ Officer Tera",
          npc: "Officer Tera",
          location: "Paradise (รอบเมือง)",
          summary: [
            "คุย Officer Tera แล้วใช้ CD 3 แผ่น",
            "Illegal CD ดรอปจาก Grumpy Octopus (ปลาหมึกอีกชื่อ) ที่ Sand Palace",
          ],
          requirements: [
            { name: "Illegal CD", qty: "3 แผ่น", from: "ตี Grumpy Octopus (Lv.29) @ Desert Beach Field 2 – Sand Palace" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Buffalo Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
            { name: "500 Galder Coupon", kind: "money" },
          ],
          images: [img(31)],
        },
        {
          id: "c3-buffalo",
          title: "สาย Buffalo — ส่ง CD ชุดเดิม",
          npc: "Officer Tera",
          location: "Paradise (รอบเมือง)",
          classOnly: "Buffalo",
          summary: ["ส่ง CD เหมือนกัน แค่ได้รางวัลเพิ่มเติม"],
          requirements: [
            { name: "Illegal CD", qty: "3 แผ่น", from: "ตี Grumpy Octopus (Lv.29) @ Desert Beach Field 2 – Sand Palace" },
          ],
          rewards: [
            { name: "500 Galder Coupon", kind: "money" },
            { name: "Buffalo Calf", kind: "pet", note: "Lv.25 — Talent: AP / AP 26, DX -1" },
            { name: "Strong Ring", kind: "equip", note: "Lv.15 — AP 28, AC 1" },
          ],
          images: [img(32)],
        },
        {
          id: "c3-seal-7",
          title: "Seal 7 — ดินสอสีให้ Old Artist",
          npc: "Old Artist",
          location: "Desert Beach Field 2 – Sand Palace",
          summary: [
            "คุย Old Artist ตามหาแพคดินสอสี 2 กล่อง กับกระดาษ 1 แผ่น",
            "กระดาษซื้อที่ร้านค้าได้ ส่วน Color Pencils ดรอปจาก Fanta Fish",
          ],
          requirements: [
            { name: "Color Pencils", qty: "2 กล่อง", from: "ตี Fanta Fish (Lv.21) @ Desert Beach Field 2 – Sand Palace" },
            { name: "กระดาษ", qty: "1 แผ่น", from: "ซื้อที่ร้านค้า" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Dragon Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
            { name: "ยา B", qty: "10 ขวด", kind: "potion" },
            { name: "Postcard", kind: "item" },
          ],
          images: [img(33), img(34)],
        },
        {
          id: "c3-dragon",
          title: "สาย Dragon — ของส่งชุดเดิม",
          npc: "Old Artist",
          location: "Desert Beach Field 2 – Sand Palace",
          classOnly: "Dragon",
          summary: ["ของส่งเหมือนกัน แต่รับรางวัลเพิ่มเติม"],
          requirements: [
            { name: "Color Pencils", qty: "2 กล่อง", from: "ตี Fanta Fish (Lv.21) @ Desert Beach Field 2 – Sand Palace" },
            { name: "กระดาษ", qty: "1 แผ่น", from: "ซื้อที่ร้านค้า" },
          ],
          rewards: [
            { name: "Postcard", kind: "item" },
            { name: "Dragon Whelp", kind: "pet", note: "Lv.25 — Talent: MP, MA, LK / MP 90, MA 2, LK 2" },
            { name: "Smart Ring", kind: "equip", note: "Lv.15 — MP 90, MA 2" },
          ],
          images: [img(35)],
        },
        {
          id: "c3-seal-8",
          title: "Seal 8 — ขุดชุดว่ายน้ำให้ Rosemary",
          npc: "Rosemary",
          location: "Paradise (รอบเมือง)",
          summary: ["คุย Rosemary แล้วไปขุดชุดว่ายน้ำ 2 ตัว", "ขุดได้ที่ Desert Beach Field 2 – Sand Palace"],
          requirements: [
            { name: "Swimsuit", qty: "2 ตัว", from: "ขุดที่ Desert Beach Field 2 – Sand Palace" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Raccoon Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
          ],
          images: [img(36)],
        },
        {
          id: "c3-raccoon",
          title: "สาย Raccoon — กระดาษกับปากกาให้ Rosemary",
          npc: "Rosemary",
          location: "Paradise (รอบเมือง)",
          classOnly: "Raccoon",
          summary: [
            "คุย Rosemary ส่งกระดาษ 2 แผ่น กับปากกา 2 ด้าม",
            "กระดาษซื้อที่ร้านค้า ส่วน Pen ดรอปจาก Fanta Fish",
          ],
          requirements: [
            { name: "กระดาษ", qty: "2 แผ่น", from: "ซื้อที่ร้านค้า" },
            { name: "Pen", qty: "2 ด้าม", from: "ตี Fanta Fish (Lv.21) @ Desert Beach Field 2 – Sand Palace" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Signed Agreement", kind: "item" },
            { name: "Raccoon Cub", kind: "pet", note: "Lv.25 — Talent: AP, HP, HV / AP 20, HP 160, DP 8, HV 2" },
            { name: "Solid Ring", kind: "equip", note: "Lv.15 — HP 90, HV 2" },
          ],
          images: [img(37), img(38)],
        },
        {
          id: "c3-finish",
          title: "ปิด EP 0 — กลับไปส่ง Andrew",
          npc: "Andrew",
          location: "Paradise",
          summary: ["เก็บ Welcome Seal ครบแล้วกลับไปส่ง Andrew พร้อมจบภารกิจ Episode 0 Chapter 3"],
          requirements: [{ name: "Welcome Seal", qty: "8 อัน" }],
          rewards: [
            { name: "Wing Port (Paradise)", qty: "10 อัน", kind: "item" },
            {
              name: "Health Charm",
              kind: "equip",
              note: "Lv.20 — MD 8, HP 320, DP 8 / Compound ได้: DP, HV, Water Resist, Air Resist",
            },
          ],
          images: [img(38)],
        },
      ],
    },
  ],
};
