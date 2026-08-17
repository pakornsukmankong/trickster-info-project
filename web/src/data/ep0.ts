import type { Episode } from "./types";

const img = (n: number) => `/images/ep0/ep0-${String(n).padStart(2, "0")}.jpg`;

export const ep0: Episode = {
  slug: "ep0",
  number: 0,
  title: "จุดเริ่มต้นของการผจญภัย",
  titleEn: "Episode 0 — The Start of an Adventure",
  tagline:
    "เควสสายหลักตั้งแต่ก้าวแรกที่ Coral Town จนข้ามถ้ำไปถึง Desert Beach และเก็บ Welcome Seal ครบ 8 อัน",
  areas: ["Coral Town", "Coral Beach Field 1–3", "Gate of Desert Beach", "Desert Beach", "Paradise"],
  status: "ready",
  chapters: [
    {
      slug: "chapter-1",
      number: 1,
      title: "ก้าวแรกที่ Coral Town",
      titleEn: "Chapter 1 — The Start of an Adventure",
      area: "Coral Town – Blooming Cora / Coral Beach Field 1–3",
      levelHint: "Lv.1 ขึ้นไป",
      intro:
        "บทแรกเป็นเควสสอนเล่น เดินคุยกับ NPC รอบเมือง Coral Town และชายหาดทั้ง 3 โซน จะได้ชุด Rookie Set, เพ็ทตัวแรก, ยา Lucky Potion และกระเป๋าเพิ่มน้ำหนักไปใช้ยาว ๆ",
      steps: [
        {
          id: "c1-heidi",
          title: "ลงทะเบียนนักผจญภัยกับ Heidi",
          npc: "Heidi",
          location: "Coral Town – Blooming Cora",
          summary: [
            "คุยกับ Heidi เพื่อรับ Registration Form",
            "เอาไปให้ Bunny Maid เพื่อจบเควส",
          ],
          requirements: [{ name: "Registration Form", qty: "1 ใบ", from: "รับจาก Heidi" }],
          rewards: [
            { name: "Rookie Sword", kind: "equip" },
            { name: "Rookie Set — Hat", kind: "equip" },
            { name: "Rookie Set — Shield", kind: "equip" },
          ],
          images: [img(1)],
        },
        {
          id: "c1-bunny-maid",
          title: "หา Carrot ให้ Bunny Maid",
          npc: "Bunny Maid",
          location: "Coral Town – Blooming Cora",
          summary: [
            "Bunny Maid จะให้ไปหา Carrot 2 ชิ้น",
            "Baby Carrot ดรอปจาก Torobbie ที่ Coral Beach Field 1 – Blue Wave",
            "เอามาส่งเพื่อจบเควส",
          ],
          requirements: [
            { name: "Baby Carrot", qty: "2 ชิ้น", from: "ตี Torobbie @ Coral Beach Field 1 – Blue Wave" },
          ],
          rewards: [{ name: "Level Up Guide", kind: "book", note: "อ่านแล้วรู้เรื่องระบบเลเวลและสเตตัส" }],
          images: [img(13)],
        },
        {
          id: "c1-winnie",
          title: "รับเพ็ทตัวแรกจาก Winnie",
          npc: "Winnie",
          location: "Coral Town – Blooming Cora",
          summary: ["ไปหา Winnie แล้วคุยจนจบเควส", "จะได้ Young Egg Pet เป็นเพ็ทตัวแรก"],
          rewards: [
            {
              name: "Young Egg Pet",
              kind: "pet",
              note: "ใช้ได้ตั้งแต่ Lv.1 — Talent: LK / Luck 1, Defense Points 2",
            },
            { name: "Recovery Guide", kind: "book", note: "สมุดสอนเรื่องการฟื้น HP/MP" },
          ],
          images: [img(14)],
        },
        {
          id: "c1-deen",
          title: "Lifeguard Deen — Blue Wave",
          npc: "Lifeguard Deen",
          location: "Coral Beach Field 1 – Blue Wave",
          summary: [
            "รอบแรก: คุยจบรับรางวัลได้เลย",
            "รอบสอง: ให้ไปตี Tottochi 5 ตัวแล้วกลับมาส่ง",
          ],
          requirements: [{ name: "ตี Tottochi", qty: "5 ตัว", from: "Coral Beach Field 1 – Blue Wave / Lovers' Maze" }],
          rewards: [
            { name: "Lucky Potion", qty: "สีละ 10 ขวด", kind: "potion" },
            { name: "Recovery Guide", kind: "book" },
            { name: "500 Galder Coin", qty: "5 เหรียญ", kind: "money", note: "ควรเก็บไว้ อย่าเพิ่งกด" },
          ],
          tips: ["เหรียญ 500 Galder ควรเก็บสะสมไว้ก่อน อย่ารีบกดใช้"],
          images: [img(2)],
        },
        {
          id: "c1-tinnie",
          title: "Tinnie — Passionate Sun",
          npc: "Tinnie",
          location: "Coral Beach Field 2 – Passionate Sun",
          summary: [
            "รอบแรก: คุยจบรับ Lucky Potion กับเงินก้อนแรก",
            "รอบสอง: ตี Bad Fury 5 ตัวแล้วกลับมาส่ง",
          ],
          requirements: [{ name: "ตี Bad Fury", qty: "5 ตัว", from: "Coral Beach Field 2 – Passionate Sun" }],
          rewards: [
            { name: "Lucky Potion", qty: "สีละ 10 ขวด", kind: "potion" },
            { name: "2,000 Galder", kind: "money" },
            { name: "500 Galder Coin", qty: "5 เหรียญ", kind: "money", note: "ควรเก็บไว้ อย่าเพิ่งกด" },
          ],
          images: [img(15)],
        },
        {
          id: "c1-bean",
          title: "Lifeguard Bean — Sunny Beach",
          npc: "Lifeguard Bean",
          location: "Coral Beach Field 3 – Sunny Beach",
          summary: [
            "รอบแรก: คุยจบรับ Lucky Potion สีละ 10 ขวด",
            "รอบสอง: ให้ไปหา Cool Ice 5 ก้อน ดรอปจาก Blue Penguin",
          ],
          requirements: [
            { name: "Cool Ice", qty: "5 ก้อน", from: "ตี Blue Penguin @ Coral Beach Field 3 – Sunny Beach" },
          ],
          rewards: [{ name: "Lucky Potion", qty: "สีละ 10 ขวด", kind: "potion" }],
          images: [img(3)],
        },
        {
          id: "c1-finish",
          title: "ปิดบทที่ 1 — รับกระเป๋าเพิ่มน้ำหนัก",
          npc: "Lifeguard Bean",
          location: "Coral Beach Field 3 – Sunny Beach",
          summary: [
            "ส่งของครบแล้วจะได้ Accessory เพิ่มน้ำหนัก 200 พร้อมสมุด",
            "คุยด้วยอีกรอบเป็นอันจบภารกิจ Episode 0 Chapter 1",
          ],
          rewards: [
            {
              name: "Pocket Pouch",
              kind: "equip",
              note: "ใช้ได้ Lv.10 — เพิ่มน้ำหนักที่ถือได้ +200",
            },
            { name: "Shortcut Guide", kind: "book", note: "สมุดรวมปุ่มลัดในเกม" },
          ],
          images: [img(16)],
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
        "บทนี้พาเดินทะลุถ้ำจากชายหาดเข้าสู่เขตทะเลทราย เป็นบทที่สอนระบบขุด (Drill), ระบบผสมของ (Compound) และระบบตีบวก (Refine) ครบทั้งสามอย่าง",
      steps: [
        {
          id: "c2-marky",
          title: "เดินทะลุถ้ำไปหา Don Giuvanni",
          npc: "Don Giuvanni / Driller Marky",
          location: "Gate of Desert Beach",
          summary: [
            "เดินทะลุถ้ำไปหา Don Giuvanni ที่ Gate of Desert Beach",
            "ครั้งแรกจะได้เงิน 4,000 Galder",
            "จากนั้น Driller Marky จะให้ขุด Tanning Oil 2 ขวด ขุดแถวนั้นได้เลย",
          ],
          requirements: [{ name: "Tanning Oil", qty: "2 ขวด", from: "ขุดบริเวณ Gate of Desert Beach" }],
          rewards: [{ name: "4,000 Galder", kind: "money" }],
          images: [img(4)],
        },
        {
          id: "c2-peng",
          title: "รับ Peng Pet และสว่านขุด",
          npc: "Driller Marky",
          location: "Gate of Desert Beach",
          summary: [
            "ส่ง Tanning Oil แล้วจะได้ Peng Pet พร้อมสมุด Drilling for Dummies",
            "Driller Marky แจก Basic Drill ได้ไม่จำกัดจำนวน เอาไว้ขุดของ",
          ],
          rewards: [
            {
              name: "Peng",
              kind: "pet",
              note: "Lv.15 — Talent: MP, DA, HP",
            },
            { name: "Drilling for Dummies", kind: "book" },
            { name: "Basic Drill", kind: "item", note: "ขอเพิ่มได้ไม่จำกัด — ลึกสุด 20m, ความทน 250" },
          ],
          tips: [
            "บั๊กที่พบบ่อย: บางตัวละครจบเควส Driller Marky ไม่ได้ ทำให้รับเควส Don Giuvanni ต่อไม่ผ่านเพราะขาดสมุด Drilling for Dummies — แก้โดยให้ตัวละครที่เคยทำแล้วโยนสมุดให้ (โอกาสติดบั๊กประมาณ 10%)",
          ],
          images: [img(17)],
        },
        {
          id: "c2-giuvanni-items",
          title: "รับวัตถุดิบทำยาจาก Don Giuvanni",
          npc: "Don Giuvanni",
          location: "Gate of Desert Beach",
          summary: ["คุย Don Giuvanni รับรางวัลอย่างละ 5 ชิ้น", "ทั้งสามอย่างนี้ห้ามทิ้ง ต้องใช้ต่อในเควสถัดไป"],
          rewards: [
            { name: "Oasis Water", qty: "5 ชิ้น", kind: "item", note: "Key Quest Item" },
            { name: "Distilled Water", qty: "5 ชิ้น", kind: "item" },
            { name: "Empty Potion Bottle", qty: "5 ชิ้น", kind: "item" },
          ],
          tips: ["ห้ามทิ้งของสามอย่างนี้เด็ดขาด"],
          images: [img(5)],
        },
        {
          id: "c2-desert-potion",
          title: "ผสม Desert Potion กับ Compounder Paul",
          npc: "Officer Robert / Compounder Paul",
          location: "Desert Beach / Paradise Shop",
          summary: [
            "วาร์ปเข้าเขต Desert Beach ไปหา Officer Robert",
            "รอบแรกจะได้ของแบบเดียวกับเควสก่อนหน้าเพิ่มมาอีกอย่างละ 5 ชิ้น",
            "รอบสองเอาของพวกนั้นไปผสมเป็น Desert Potion 1 ขวด ที่ Compounder Paul ใน Shop",
          ],
          requirements: [
            { name: "Oasis Water / Distilled Water / Empty Potion Bottle", qty: "อย่างละ 5", from: "Officer Robert" },
            { name: "Desert Potion", qty: "1 ขวด", from: "ผสมที่ Compounder Paul" },
          ],
          tips: ["อัตราสำเร็จพื้นฐาน 45% ใช้แค่ขวดเดียว โอกาส 1 ใน 10 ถือว่าไม่ยาก"],
          images: [img(6)],
        },
        {
          id: "c2-nate",
          title: "Compound เสื้อกับ Alchemist Nate",
          npc: "Officer Robert / Alchemist Nate",
          location: "Desert Beach / Paradise Shop",
          summary: [
            "ส่ง Desert Potion ให้ Officer Robert จะได้ของ 2 อย่าง",
            "เอาไปหา Alchemist Nate ใน Paradise Shop เพื่อ Compound เสื้อ",
          ],
          rewards: [
            { name: "Life Vest", kind: "equip", note: "Lv.10 — Compound ได้: MD, DP, Soil Resist, Water Resist" },
            { name: "Hard Scales", kind: "item", note: "Compound Ability: DP — เพิ่มพลังป้องกันให้ของ Lv.0 ขึ้นไป" },
          ],
          images: [img(18)],
        },
        {
          id: "c2-wooden-sword",
          title: "รับใบรับรองและดาบไม้",
          npc: "Alchemist Nate / Officer Robert",
          location: "Paradise Shop / Desert Beach",
          summary: [
            "Compound เสร็จ คุย Nate อีกรอบรับรางวัล",
            "ออกมาส่ง Officer Robert รับยาและดาบสำหรับเควสถัดไป",
          ],
          rewards: [
            { name: "Nate's Certification", kind: "item" },
            { name: "Mature Compounding Guide", kind: "book" },
            { name: "ยา B", qty: "แบบละ 20 ขวด", kind: "potion" },
            { name: "Wooden Sword", kind: "equip", note: "ใช้ในเควสถัดไป" },
          ],
          images: [img(19)],
        },
        {
          id: "c2-marx",
          title: "Refine ดาบกับ Blacksmith Marx",
          npc: "Blacksmith Marx / Officer Robert",
          location: "Paradise Shop / Desert Beach",
          summary: [
            "Blacksmith Marx ใน Paradise Shop จะให้หา Bronze Gemstone 7 ก้อน",
            "ขุดได้ที่เหมืองฝั่งขวาของเมืองเขต 1",
            "ส่งเสร็จแล้วทำการ Refine ดาบอันนั้นเป็น +1",
            "ออกมาส่ง Officer Robert เป็นอันจบ Episode 0 Chapter 2",
          ],
          requirements: [{ name: "Bronze Gemstone", qty: "7 ก้อน", from: "ขุดเหมืองฝั่งขวาของเมืองเขต 1" }],
          rewards: [
            { name: "Refining Guide", kind: "book" },
            { name: "Hologram Port (Ep0)", qty: "5 แผ่น", kind: "item", note: "ใช้ชุบชีวิตตอนตาย — วาร์ปไปจุดโฮโลแกรมของ Don Cavalier" },
          ],
          images: [img(7)],
        },
      ],
    },
    {
      slug: "chapter-3",
      number: 3,
      title: "ล่า Welcome Seal 8 อัน",
      titleEn: "Chapter 3 — Our Prologue",
      area: "Paradise / Desert Beach Field 1–2",
      levelHint: "หลังจบ Chapter 2",
      intro:
        "บทสุดท้ายของ EP 0 คือภารกิจสะสม Welcome Seal ทั้งหมด 8 อัน NPC ทุกตัวอยู่รอบเมือง Paradise ทำเรียงกันไปตามลำดับจะง่ายที่สุด ทำครบแล้วรับ Wing Port และ Health Charm",
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
          images: [img(20)],
        },
        {
          id: "c3-seal-1",
          title: "Seal 1 — ช่อดอกไม้ให้ Steve Ryu",
          npc: "Steve Ryu",
          location: "Paradise (รอบเมือง)",
          summary: ["คุย Steve Ryu แล้วหา Bouquet 3 ช่อมาส่ง", "Bouquet ดรอปจาก Hula Octopus"],
          requirements: [
            { name: "Bouquet", qty: "3 ช่อ", from: "ตี Hula Octopus @ Desert Beach Field 2 – Sand Palace" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Bunny Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
          ],
          images: [img(8)],
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
            { name: "Cat Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
            { name: "ยา B", qty: "10 ขวด", kind: "potion" },
          ],
          images: [img(22)],
        },
        {
          id: "c3-seal-3",
          title: "Seal 3 — ขนเป็ดให้ Clever Owl",
          npc: "Clever Owl",
          location: "Paradise (รอบเมือง)",
          summary: ["คุย Clever Owl แล้วหาขนเป็ด 3 อัน", "Golden Mole Feather ดรอปจาก Golden Mole"],
          requirements: [
            { name: "Golden Mole Feather", qty: "3 อัน", from: "ตี Golden Mole @ Desert Beach Field 1 – Delta Island" },
          ],
          rewards: [
            { name: "Welcome Seal", qty: "1 อัน", kind: "item" },
            { name: "Sheep Card", kind: "card", note: "รางวัลเพิ่ม — Life +3" },
          ],
          images: [img(11)],
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
          images: [img(21), img(9)],
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
          images: [img(10), img(23)],
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
          images: [img(24), img(12)],
        },
      ],
    },
  ],
};

