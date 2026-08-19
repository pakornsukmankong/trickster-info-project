import type { Episode } from "./types";

const img = (n: number) => `/images/ep1/ep1-${String(n).padStart(3, "0")}.jpg`;

export const ep1: Episode = {
  slug: "ep1",
  group: "ep",
  number: 1,
  title: "ซากโบราณสู่เมืองท่า",
  titleEn: "Episode 1 — Caballa Relics & Oops Wharf",
  tagline:
    "เควสสายหลักเริ่มที่ Lv.45 ตั้งแต่ซ่อมสร้อยให้ Old Artist ไล่ตามกล่องปริศนาที่เมืองท่า จนดำน้ำลงไปตามหาสมบัติฮาคอน",
  areas: [
    "Caballa Relics",
    "Relics Field 1–4",
    "Megalopolis",
    "Azteca",
    "Oops Wharf",
    "Wharf Field 1–4",
    "Path to Mermaid Palace",
  ],
  status: "ready",
  chapters: [
    {
      slug: "chapter-1",
      number: 1,
      title: "สร้อยของเนเฟอร์ติติ",
      titleEn: "Chapter 1 — Nefertiti's Necklace",
      area: "Caballa Relics / Relics Field 1 – Atlas / Azteca / Megalopolis",
      levelHint: "Lv.45 ขึ้นไป",
      intro:
        "บทยาวที่สุดของ EP 1 เป็นเควสวิ่งของไปมาระหว่าง Old Artist, Model Mermaid Babe และ Monkey T เพื่อบูรณะสร้อยเก่าให้กลับมาสวยเหมือนเดิม ระหว่างทางต้องผสมชา 2 ชนิดและหาน้ำศักดิ์สิทธิ์",
      steps: [
        {
          id: "e1c1-monkey-t",
          title: "รับสร้อยเก่าจาก Monkey T",
          npc: "Monkey T",
          location: "Gate of Caballa Relics",
          summary: [
            "คุย Monkey T ที่ Gate of Caballa Relics",
            "เขาจะขอ 50 Galder Coupon 5 เหรียญ",
            "คูปองขุดได้ที่แมพตั๊กแตนล่างซ้ายของ Megalo",
          ],
          requirements: [
            { name: "50 Galder Coupon", qty: "5 เหรียญ", from: "ขุดที่แมพตั๊กแตนล่างซ้าย Megalo" },
          ],
          rewards: [{ name: "Faded Necklace", kind: "item", note: "สร้อยที่สีซีดจาง รอการบูรณะ" }],
          images: [img(1)],
        },
        {
          id: "e1c1-ginseng-tea",
          title: "Old Artist ขอชาโสม",
          npc: "Old Artist",
          location: "Relics Field 1 – Atlas",
          summary: [
            "เดินลงมาที่ Relics Field 1 – Atlas คุย Old Artist",
            "เขาจะขอ Ginseng Tea 1 แก้ว เพื่อลงสีสร้อย",
            "สูตร: Ginseng 2 + Honey 1 + Distilled Water 1 ผสมที่ Compounder Paul ที่ Azteca",
          ],
          requirements: [
            { name: "Ginseng", qty: "2 อัน", from: "ขุดที่ Southeast Forest / Southwest Forest (ค่อนข้างขุดยาก)" },
            { name: "Honey", qty: "1 ขวด", from: "ตี Forest Wasp (Lv.47) @ Southwest Forest" },
            { name: "Distilled Water", qty: "1 ขวด", from: "ซื้อที่ Shop ได้ทุกเมือง" },
            { name: "Ginseng Tea", qty: "1 แก้ว", from: "ผสมที่ Compounder Paul @ Azteca" },
          ],
          tips: [
            "Old Artist คุยได้เฉพาะช่วงเวลากลางวันในเกมเท่านั้น",
            "อัตราสำเร็จพื้นฐานของการผสมชาโสมอยู่ที่ 45%",
          ],
          images: [img(2), img(3)],
        },
        {
          id: "e1c1-holy-water",
          title: "หาน้ำศักดิ์สิทธิ์กับ Guide Sabrina",
          npc: "Old Artist / Guide Sabrina",
          location: "Azteca",
          summary: [
            "ส่งชาโสมแล้วจะได้ Empty Container 1 ถัง",
            "ต้องไปหาน้ำมาเติมถังที่ Azteca",
            "Guide Sabrina จะขอทอง 5 ก้อนกับไข่ทองคำ 1 ใบ เพื่อทำน้ำศักดิ์สิทธิ์ให้",
          ],
          requirements: [
            { name: "Gold", qty: "5 ก้อน", from: "ตี Mimic (Lv.61) @ Relics Field 2 / 3 / 4" },
            { name: "Golden Egg", qty: "1 ใบ", from: "ขุดรอบเมือง Caballa Relics Fields" },
          ],
          rewards: [
            { name: "Empty Container", kind: "item" },
            { name: "Fully-Filled Container", kind: "item", note: "ถังน้ำศักดิ์สิทธิ์สำหรับล้างพู่กัน" },
          ],
          images: [img(4), img(5)],
        },
        {
          id: "e1c1-portraits",
          title: "รับเควสช่วยวาดภาพ",
          npc: "Old Artist",
          location: "Relics Field 1 – Atlas",
          summary: [
            "กลับไปหา Old Artist แล้วส่งน้ำ",
            "รับเควสช่วยวาดภาพข้อ 2 จะได้ภาพวาด 2 ใบกับเควสถัดมา",
          ],
          rewards: [
            { name: "Nefertiti's Portrait", kind: "item" },
            { name: "Mermaid Babe's Portrait", kind: "item" },
          ],
          tips: ["คุยได้เฉพาะช่วงเวลากลางวัน"],
          images: [img(6)],
        },
        {
          id: "e1c1-antique-mirror",
          title: "แลกกระจกโบราณกับ Monkey T",
          npc: "Model Mermaid Babe / Monkey T",
          location: "Caballa Relics / Gate of Caballa Relics",
          summary: [
            "Model Mermaid Babe จะขอภาพวาดก่อนหน้าพร้อมกระจก",
            "กระจกต้องกลับไปแลกกับ Monkey T ที่ Gate of Caballa Relics",
            "เขาจะขอ 500 Galder Coupon 2 เหรียญ เพื่อแลกกับกระจก",
          ],
          requirements: [
            { name: "500 Galder Coupon", qty: "2 เหรียญ", from: "ขุดคูปองแบบเดียวกับเควสแรก" },
          ],
          rewards: [{ name: "Antique Mirror", kind: "item" }],
          images: [img(7)],
        },
        {
          id: "e1c1-fantastic-powder",
          title: "หาผงวิเศษให้ Louis Bitton",
          npc: "Model Mermaid Babe / Louis Bitton",
          location: "Azteca / Relics Field 4 – An Altar for Sacrifice",
          summary: [
            "เอากระจกกลับไปส่ง Model Mermaid Babe — ภาพวาดจะหายไป 1 แผ่นแต่ได้กระจกคืนมาแทน",
            "ไปหา Louis Bitton ที่ Azteca เขาจะขอกระจกพร้อมผงวิเศษ",
            "Fantastic Powder ขุดได้เขตเดียวคือ Relics Field 4 – An Altar for Sacrifice",
          ],
          requirements: [
            { name: "Fantastic Powder", from: "ขุดที่ Relics Field 4 – An Altar for Sacrifice" },
          ],
          images: [img(8)],
        },
        {
          id: "e1c1-chuu-check",
          title: "กระจกวิเศษแลกตั๋วจุบ",
          npc: "Louis Bitton / Model Mermaid Babe",
          location: "Azteca / Caballa Relics",
          summary: [
            "ส่งเสร็จจะได้รับกระจกวิเศษ Fantastic Hand Mirror",
            "เอากระจกวิเศษกลับไปส่ง Model Mermaid Babe",
            "รอบนี้นางจะให้ตั๋วจุบ 1 ใบ",
          ],
          rewards: [
            { name: "Fantastic Hand Mirror", kind: "item" },
            { name: "Chuu~ Check", kind: "item", qty: "1 ใบ" },
          ],
          images: [img(9)],
        },
        {
          id: "e1c1-restored-necklace",
          title: "รับสร้อยคืนและส่งให้ Love Hunter Robin",
          npc: "Old Artist / Love Hunter Robin",
          location: "Relics Field 1 – Atlas / Path to Caballa Relics",
          summary: [
            "ส่งตั๋วจุบที่ Old Artist จะได้สร้อยที่บูรณะแล้ว",
            "ไปหา Love Hunter Robin ที่ Path to Caballa Relics (แมพนกใบไม้)",
            "ส่งสร้อยแล้วจะได้จี้สายน้ำเป็นเครื่องประดับ",
          ],
          rewards: [
            { name: "Restored Necklace", kind: "item" },
            {
              name: "Aquamarine Pendant",
              kind: "equip",
              note: "Lv.50 — AP 80, DX -1, DA 5, HV 5 / 2 ช่อง Compound (AP, DA, HV)",
            },
          ],
          tips: ["Old Artist คุยได้เฉพาะช่วงเวลากลางวัน"],
          images: [img(10)],
        },
        {
          id: "e1c1-honey-tea",
          title: "ปิดบทที่ 1 — ชาน้ำผึ้งให้ Rosaline Gracia",
          npc: "Rosaline Gracia",
          location: "Megalopolis",
          summary: [
            "ไปหา Rosaline Gracia ที่ Megalo",
            "นางจะขอรูปภาพกับชาน้ำผึ้ง",
            "สูตร: Honey 1 + Royal Jelly 2 + Distilled Water 2 ผสมที่ Compounder Paul",
            "ส่งครบจะได้ม้วนปริศนา 1 แผ่น เป็นอันจบ Chapter 1",
          ],
          requirements: [
            { name: "Royal Jelly", qty: "2 ก้อน", from: "ตี Forest Wasp (Lv.47) @ Southwest Forest" },
            { name: "Honey", qty: "1 ขวด", from: "ตี Forest Wasp (Lv.47)" },
            { name: "Distilled Water", qty: "2 ขวด", from: "ซื้อที่ Shop" },
            { name: "Honey Tea", qty: "1 แก้ว", from: "ผสมที่ Compounder Paul @ Megalopolis Square หรือ Azteca" },
          ],
          rewards: [{ name: "Unknown Old Document", kind: "item", qty: "1 แผ่น" }],
          tips: ["อัตราสำเร็จพื้นฐานของชาน้ำผึ้งอยู่ที่ 40%"],
          images: [img(11), img(12)],
        },
      ],
    },
    {
      slug: "chapter-2",
      number: 2,
      title: "กล่องโบราณปริศนา",
      titleEn: "Chapter 2 — Unknown Ancient Box",
      area: "Caballa Relics Dungeon 1 / Oops Wharf / Wharf Field 1–4",
      levelHint: "หลังจบ Chapter 1",
      intro:
        "ตามหาชิ้นส่วน Weird Piece 3 ชิ้นจาก NPC สามคนรอบเมืองท่า Oops Wharf แล้วเอากลับไปประกอบเป็นกุญแจเปิดกล่องปริศนาที่ดันเจี้ยน",
      steps: [
        {
          id: "e1c2-start",
          title: "รับภารกิจจาก Indiana John",
          npc: "Indiana John",
          location: "Caballa Relics Dungeon 1 (เข้าตรงเขต 4)",
          summary: [
            "เริ่มต้นที่ Indiana John ใน Caballa Relics Dungeon 1 (เข้าตรงเขต 4)",
            "รับภารกิจตามหา Weird Piece 3 ชิ้น",
            "ชิ้นแรกต้องไปเมืองท่า Oops Wharf",
          ],
          images: [img(13)],
        },
        {
          id: "e1c2-piece-1",
          title: "ชิ้นที่ 1 — Skipper Min",
          npc: "Skipper Min",
          location: "Oops Wharf",
          summary: [
            "ตามหา Skipper Min ที่ Oops Wharf",
            "รับเควสขุดหาเชือก 3 อันกับแผ่นไม้ 5 อัน",
            "ขุดใต้ดินรอบเมืองท่าเรือได้ทุกเขต",
          ],
          requirements: [
            { name: "Thick Rope", qty: "3 อัน", from: "ขุดใน Wharf Fields / เปิด Novice Compound Box" },
            {
              name: "Piece of Lumber",
              qty: "5 อัน",
              from: "ขุดใน Oops Wharf Fields หรือดรอปจาก Black Foe (Lv.79)",
            },
          ],
          rewards: [{ name: "Weird Piece 1", kind: "item" }],
          images: [img(14)],
        },
        {
          id: "e1c2-piece-2",
          title: "ชิ้นที่ 2 — Shaman Girl Jia",
          npc: "Shaman Girl Jia",
          location: "Wharf Field 4 – Chrono Wharf",
          summary: [
            "ไปหา Shaman Girl Jia ที่ Wharf Field 4 – Chrono Wharf",
            "เธอจะขอเครื่องราง 2 อัน",
            "Bell Cluster ดรอปจาก Crow (Lv.88)",
          ],
          requirements: [
            {
              name: "Bell Cluster",
              qty: "2 อัน",
              from: "ตี Crow (Lv.88) @ Wharf Field 2 – Devil Crow / Wharf Field 3 – Phantom Park",
            },
          ],
          rewards: [{ name: "Weird Piece 2", kind: "item" }],
          images: [img(15), img(16)],
        },
        {
          id: "e1c2-piece-3",
          title: "ชิ้นที่ 3 — Vagabond Eloy",
          npc: "Vagabond Eloy",
          location: "Oops Wharf",
          summary: [
            "ไปหา Vagabond Eloy ที่ Oops Wharf",
            "เขาจะขอตลับแป้ง 3 อัน",
            "Baby Powder ดรอปจาก Quiem (Lv.75)",
          ],
          requirements: [
            {
              name: "Baby Powder",
              qty: "3 อัน",
              from: "ตี Quiem (Lv.75) @ Wharf Field 1 – Haunted Town / Wharf Field 3 – Phantom Park",
            },
          ],
          rewards: [{ name: "Weird Piece 3", kind: "item" }],
          images: [img(17)],
        },
        {
          id: "e1c2-box-key",
          title: "ส่งชิ้นส่วนครบ รับกุญแจกล่อง",
          npc: "Indiana John",
          location: "Caballa Relics Dungeon 1 (เข้าตรงเขต 4)",
          summary: [
            "กลับไปหา Indiana John แล้วส่งชิ้นส่วนทั้งหมด",
            "จะได้กุญแจกล่องพร้อมหินธาตุ 2 ก้อนเป็นรางวัลเพิ่ม",
          ],
          rewards: [
            { name: "Completed Box Key", kind: "item", note: "ใส่ในกล่องแล้วกรอกรหัส VENDETTA" },
            { name: "Soil Attribute Stone", kind: "item", note: "หินดินหายาก ใช้คอม Golden Sword (Boss)" },
            { name: "Light Attribute Stone", kind: "item" },
          ],
          images: [img(18)],
        },
        {
          id: "e1c2-vendetta",
          title: "เปิดกล่องด้วยรหัส VENDETTA",
          npc: "Weird Box / Indiana John",
          location: "Caballa Relics Dungeon 1 (เข้าตรงเขต 4)",
          summary: [
            "เควสถัดมากดคุยที่กล่อง แล้วใส่รหัสตามชื่อได้เลยคือ VENDETTA",
            "จะได้รับม้วนตำรา Doc from Weird Box",
            "เอาไปคุย Indiana John เขาจะขอม้วนตำราพร้อมตะเกียง 2 อัน",
          ],
          rewards: [{ name: "Doc from Weird Box", kind: "item" }],
          images: [img(19)],
        },
        {
          id: "e1c2-lamplight",
          title: "ปิดบทที่ 2 — ตะเกียงจาก Naranjo",
          npc: "Indiana John",
          location: "Caballa Relics Dungeon 3 / 4",
          summary: [
            "Lamplight ดรอปจาก Naranjo (Lv.84) ในดันเจี้ยนเขต 3 และ 4",
            "ส่งครบหมดจะได้รับแผ่นกระดาษ เป็นอันจบภารกิจ Chapter 2",
          ],
          requirements: [
            {
              name: "Lamplight",
              qty: "2 อัน",
              from: "ตี Naranjo (Lv.84) @ Caballa Relics Dungeon 3 / 4",
            },
          ],
          rewards: [
            {
              name: "Memo from Weird Box",
              kind: "item",
              note: "เอกสารเล่าเรื่องรูปปั้นฮาคอนกับผู้พิทักษ์ 16 ตน",
            },
          ],
          images: [img(20)],
        },
      ],
    },
    {
      slug: "chapter-3",
      number: 3,
      title: "นักล่าสมบัติฮาคอน",
      titleEn: "Chapter 3 — Harkon Searchers",
      area: "Oops Wharf / Path to Mermaid Palace 1–2",
      levelHint: "หลังจบ Chapter 2",
      intro:
        "บทนี้ต้องดำน้ำลงไปใต้ทะเล ซื้อชุดดำน้ำจาก Item Girl แล้วให้ Marinel พาลง เพื่อเก็บกล่องหินสุ่มที่มีของตระกูลฮาคอนอยู่ข้างใน",
      steps: [
        {
          id: "e1c3-tango",
          title: "Tango ขอสร้อยฮาคอน",
          npc: "Tango",
          location: "Oops Wharf",
          summary: [
            "คุย Tango ที่ Oops Wharf เขาจะขอสร้อยฮาคอน 1 เส้น",
            "สร้อยได้จากการเปิดกล่องหินสุ่ม Harkon Keepsake",
            "ในกล่องสุ่มได้ทั้งสร้อย เศษฮาคอน และตราฮาคอน",
          ],
          requirements: [
            { name: "Harkon Necklace", qty: "1 เส้น", from: "เปิดกล่องหินสุ่ม Harkon Keepsake" },
          ],
          images: [img(21)],
        },
        {
          id: "e1c3-diving",
          title: "วิธีลงไปใต้น้ำหากล่องหิน",
          npc: "Item Girl / Marinel",
          location: "Oops Wharf / Path to Mermaid Palace 1–2",
          summary: [
            "ซื้อชุดดำน้ำที่ Item Girl ใน Oops Wharf ราคา 5,000G",
            "แล้วไปหา Marinel ที่เดียวกัน แสดงชุดให้ดูเพื่อลงใต้น้ำ",
            "Harkon Keepsake ขุดได้หรือดรอปจาก Cone Stone (Lv.84)",
          ],
          requirements: [
            { name: "Diving Gear", from: "ซื้อจาก Item Girl @ Oops Wharf ราคา 5,000G — ใช้ได้ครั้งเดียว 8 นาที" },
            {
              name: "Harkon Keepsake",
              from: "ขุด หรือดรอปจาก Cone Stone (Lv.84) @ Path to Mermaid Palace 1 / 2",
            },
          ],
          images: [img(22)],
        },
        {
          id: "e1c3-reina",
          title: "ส่งสร้อยแล้วตามหา Explorer Reina",
          npc: "Tango / Explorer Reina",
          location: "Oops Wharf / Path to Mermaid Palace 1",
          summary: [
            "ส่งสร้อยให้ Tango จะได้ของ 2 อย่าง (น้ำได้ 3 ขวด)",
            "ลงไปใต้น้ำตามวิธีด้านบน แล้วตามหา Explorer Reina ที่เขต 1",
            "เธอจะขอแบตเตอรี่ 5 ก้อน (เต่าอยู่เขต 2)",
          ],
          rewards: [
            { name: "Silk Handkerchief", kind: "item" },
            { name: "Volcano Water", kind: "item", qty: "3 ขวด" },
          ],
          images: [img(23)],
        },
        {
          id: "e1c3-battery",
          title: "แบตเตอรี่จากเต่านักมวย",
          npc: "Explorer Reina",
          location: "Path to Mermaid Palace 2",
          summary: [
            "Power Plan Battery ดรอปจาก Pirate Boxer B (Lv.86) ที่ Path to Mermaid Palace 2",
            "ส่งเสร็จรอบแรกจะได้ 500 Galder Coupon 5 อัน",
            "รอบที่ 2 ต้องใช้ตราฮาคอน 3 ชิ้น",
          ],
          requirements: [
            {
              name: "Power Plan Battery",
              qty: "5 ก้อน",
              from: "ตี Pirate Boxer B (Lv.86) @ Path to Mermaid Palace 2",
            },
            {
              name: "Harkon Ornament",
              qty: "3 ชิ้น",
              from: "ขุดใน Techichi Fields หรือเปิด Harkon Heirloom",
              note: "ใช้ในรอบที่ 2",
            },
          ],
          rewards: [{ name: "500 Galder Coupon", qty: "5 อัน", kind: "money" }],
          images: [img(24)],
        },
        {
          id: "e1c3-nono",
          title: "ตามหา Fairy Nono",
          npc: "Explorer Reina → Fairy Nono",
          location: "Path to Mermaid Palace 1",
          summary: [
            "จบเควสของ Explorer Reina จะได้รับ Special Polisher",
            "ตามหา Fairy Nono แล้วส่งเควสก่อนหน้าทั้งหมด — ผ้าเช็ดหน้า ยาขัด และน้ำภูเขาไฟ",
          ],
          requirements: [
            { name: "Silk Handkerchief", from: "เควส Tango" },
            { name: "Special Polisher", from: "เควส Explorer Reina" },
            { name: "Volcano Water", from: "เควส Tango" },
          ],
          rewards: [
            { name: "Special Polisher", kind: "item", note: "ยาขัดที่คืนความเงาให้หินกับอัญมณี" },
            { name: "Nono's Note", kind: "book" },
          ],
          images: [img(25)],
        },
        {
          id: "e1c3-transparent-medicine",
          title: "ยาฟ้าล่องหนให้ Fairy Nono",
          npc: "Fairy Nono / Compounder Paul",
          location: "Path to Mermaid Palace 1 / Oops Wharf",
          summary: [
            "อีกรอบนางจะขอยาฟ้าล่องหน 1 ขวด",
            "ผสมที่ Compounder Paul ที่ Oops Wharf โอกาสพื้นฐาน 40%",
            "ขวดยา (Fairy's Drink) ขุดใต้น้ำตรงจุดส่งเควสได้ทั้ง 2 เขต ส่วนเศษฮาคอนได้มาจากเควสก่อนหน้า",
          ],
          requirements: [
            { name: "Harkon Shard", qty: "1 ชิ้น", from: "เปิด Harkon Heirloom", note: "ควรสำรองเผื่อผสมแตก" },
            {
              name: "Super Bean Shell",
              qty: "2 อัน",
              from: "ตี Super Golden Mole (Lv.80) @ Path to Mermaid Palace 1",
              note: "ถั่วชื่อ Extra Pod",
            },
            { name: "Fairy's Drink", qty: "1 ขวด", from: "ขุดใต้น้ำตรงจุดส่งเควส ได้ทั้ง 2 เขต" },
          ],
          rewards: [{ name: "Transparent Medicine", qty: "1 ขวด", kind: "potion" }],
          images: [img(26), img(27)],
        },
        {
          id: "e1c3-nono-ring",
          title: "ปิดบทที่ 3 — แหวนโนโน",
          npc: "Fairy Nono",
          location: "Path to Mermaid Palace 1",
          summary: ["ส่งยาฟ้าล่องหนที่เดิม เป็นอันจบภารกิจ Episode 1 Chapter 3"],
          requirements: [{ name: "Transparent Medicine", qty: "1 ขวด" }],
          rewards: [
            {
              name: "Nono Ring",
              kind: "equip",
              note: "Lv.50 — AC 8, MA 5, LK 5 / Compound ได้: MA, AC, LK (2 ช่อง)",
            },
          ],
          images: [img(28)],
        },
      ],
    },
  ],
};
