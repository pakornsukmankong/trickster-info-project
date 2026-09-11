/**
 * สรุปของที่ต้องเก็บรายโซน ถอดจากตารางของคอมมูนิตี้ Trickster Classic
 *
 * ตารางต้นฉบับเป็นภาพ 17 ใบ ใบละโซน เก็บไว้ที่ `public/images/summary/<slug>.jpg`
 * แต่ละใบบอก 2 อย่าง คือของที่ต้องขุดแยกตามพื้นที่ย่อย กับของที่ต้องเก็บจากมอนแต่ละตัว
 *
 * กติกาที่ใช้ตอนถอด
 * - เลขแดงในตาราง (เช่น x25 +5) คือจำนวนที่กินต่อการคราฟ 1 รอบ -> `craftPerRound`
 * - เครื่องหมาย * คือของชิ้นนั้นใช้คราฟ จำนวนดาวคือจำนวนรอบ -> `craftRounds`
 * - เงื่อนไขสายตัวละครในวงเล็บ เช่น (CAT ONLY) / (NON SHEEP) -> `only`
 * - ตารางมีแต่ไอคอน ไม่มีชื่อของ ชื่อที่ใส่ไว้ยืนยันแล้วจาก `monsters.ts` และไกด์ในเว็บ
 *   ชิ้นไหนยืนยันไม่ได้จะไม่ใส่ `name` หน้าเว็บจะขึ้นว่าไม่ทราบชื่อและให้กดดูตารางต้นฉบับแทน
 *   (อย่าเดาชื่อลงไป คู่มือที่บอกชื่อผิดแย่กว่าคู่มือที่บอกว่าไม่รู้)
 */

export interface SummaryNeed {
  /** ชื่อของ เว้นว่างไว้ถ้ายังยืนยันไม่ได้ */
  name?: string;
  /**
   * ไอคอนที่ตัดจากตารางต้นฉบับ ใช้กับของที่ยังไม่รู้ชื่อ
   * สร้างด้วย `node tools/crop-summary-icons.mjs <zone>`
   */
  icon?: string;
  /** จำนวนตามตาราง เก็บเป็นข้อความเพราะมีทั้ง "8" และ "5 each" */
  qty: string;
  /** เลขแดง = จำนวนที่กินต่อการคราฟ 1 รอบ */
  craftPerRound?: number;
  /** จำนวนดาว = จำนวนรอบคราฟ */
  craftRounds?: number;
  /** เงื่อนไขสายตัวละคร เช่น "CAT ONLY", "NON SHEEP" */
  only?: string;
  /** หมายเหตุอื่นที่เขียนไว้ในตาราง */
  note?: string;
}

/** พื้นที่ขุดหนึ่งคอลัมน์ในตาราง */
export interface SummaryDrill {
  area: string;
  items: SummaryNeed[];
  /**
   * ของที่ไกด์ในเว็บระบุว่าขุดได้ในพื้นที่นี้
   * ใช้ช่วยเทียบว่าไอคอนที่ยังไม่ทราบชื่อน่าจะเป็นชิ้นไหน โดยไม่ต้องเดาลงไปในข้อมูลหลัก
   */
  candidates?: string[];
}

/** มอนหนึ่งคอลัมน์ในตาราง พร้อมของที่ต้องเก็บจากมัน */
export interface SummaryMonster {
  /** ชื่อมอน เว้นว่างถ้ายังระบุไม่ได้ว่าเป็นตัวไหน */
  name?: string;
  /** สไปรต์ที่ตัดจากตารางต้นฉบับ ใช้กับมอนที่ยังระบุตัวไม่ได้ */
  icon?: string;
  /** ชื่อที่ตารางเขียนกำกับไว้ เช่น "(Hula)" หรือโซนที่เจอ */
  label?: string;
  /** คำเตือนในตาราง เช่น "CAUTION: LVL 34" */
  warning?: string;
  drops: SummaryNeed[];
}

export interface SummaryZone {
  slug: string;
  title: string;
  titleEn: string;
  /** ตารางต้นฉบับของโซนนี้ */
  image: string;
  /** ready = ถอดข้อมูลแล้ว, soon = ยังมีแต่ภาพต้นฉบับ */
  status: "ready" | "soon";
  drill: SummaryDrill[];
  monsters: SummaryMonster[];
}

const img = (slug: string) => `/images/summary/${slug}.jpg`;

/** ไอคอนที่ตัดจากตารางต้นฉบับ เลขลำดับมาจาก crop-summary-icons.mjs */
const cut = (zone: string, n: string) => `/icons/summary/${zone}-${n}.png`;
const db = (n: string) => cut("desert-beach", n);
const pop = (n: string) => cut("poppuri", n);

const desertBeach: SummaryZone = {
  slug: "desert-beach",
  title: "ทะเลทราย",
  titleEn: "Desert Beach",
  image: img("desert-beach"),
  status: "ready",
  drill: [
    {
      area: "Gate of DB",
      items: [{ name: "Tanning Oil", qty: "2" }],
    },
    { area: "1st Mining Lot", items: [{ qty: "7", icon: db("02") }] },
    {
      area: "Any DB Field",
      items: [
        { qty: "2", icon: db("a") },
        { qty: "1", icon: db("b") },
        { qty: "1", icon: db("10") },
      ],
    },
    {
      area: "DB Field 1",
      candidates: ["Jenny's Photo B", "Magic Sealed Letter", "Salt"],
      items: [
        { qty: "1", only: "NON CAT", icon: db("03") },
        { qty: "1", only: "SHEEP ONLY", icon: db("08") },
        { name: "Salt", qty: "3", only: "NON FOX" },
      ],
    },
    {
      area: "DB Field 2",
      candidates: ["Swimsuit"],
      items: [
        { name: "Red Lipstick", qty: "3", only: "BUNNY ONLY" },
        { qty: "1", note: "สาย Racoon ใช้ 2", icon: db("c") },
        { qty: "2", only: "NON RACOON", icon: db("11") },
        { name: "Sun Cream", qty: "10", craftPerRound: 5 },
      ],
    },
    {
      area: "DB Field 3",
      candidates: ["Soap", "Shampoo", "Bath Sponge"],
      items: [
        { qty: "8", icon: db("05") },
        { qty: "5", icon: db("09") },
        { qty: "5", icon: db("12") },
      ],
    },
    {
      area: "DB Field 4",
      items: [
        {
          qty: "5 each",
          icon: db("06"),
          note: "จดหมาย 5 สี อย่างละ 5 — Lucky / Cursed / Love / Confession / Farewell Letter",
        },
      ],
    },
    { area: "Pyramid Dungeon", items: [{ qty: "1", icon: db("d") }] },
  ],
  monsters: [
    {
      name: "Hula Octopus",
      label: "(Hula)",
      drops: [
        { name: "Bouquet", qty: "3", only: "NON-BUNNY" },
        { qty: "10", icon: db("35") },
      ],
    },
    {
      name: "Shell Trap",
      drops: [{ name: "Clam Meat", qty: "3", only: "CAT ONLY", craftPerRound: 5 }],
    },
    {
      name: "Golden Mole",
      drops: [
        { name: "Golden Mole Feather", qty: "3", only: "NON SHEEP" },
        { name: "Earthworm", qty: "3", only: "FOX ONLY" },
      ],
    },
    {
      name: "Sea Scorpion",
      drops: [
        { name: "Scorpion Jerky", qty: "3", only: "NON LION", craftPerRound: 5 },
        { name: "Flower Necklace", qty: "10" },
      ],
    },
    {
      name: "Fanta Slime",
      drops: [
        { name: "Twinkle Star", qty: "3", only: "LION ONLY" },
        { qty: "5", craftPerRound: 5, icon: db("38") },
      ],
    },
    { name: "Grumpy Octopus", label: "(Grumpy)", drops: [{ name: "Illegal CD", qty: "3" }] },
    {
      name: "Fanta Fish",
      drops: [
        { name: "Color Pencils", qty: "2" },
        { qty: "2", only: "RACOON ONLY", icon: db("39") },
      ],
    },
    {
      name: "Sand Demon",
      drops: [
        { name: "Sand Cake", qty: "5", craftPerRound: 5 },
        { name: "Sand Glass", qty: "1" },
        { name: "Legendary Recipe", qty: "1" },
      ],
    },
    { name: "Pineapple", drops: [{ name: "Pineapple Mask", qty: "10" }] },
    {
      name: "Uraeus",
      warning: "CAUTION: LVL 34",
      drops: [{ name: "Venomous Canine", qty: "5", craftRounds: 1 }],
    },
    { icon: db("41"), drops: [{ qty: "30", craftPerRound: 30, icon: db("45") }] },
  ],
};

const poppuri: SummaryZone = {
  slug: "poppuri",
  title: "ถ้ำป๊อปปุริ",
  titleEn: "Poppuri Dungeon",
  image: img("poppuri"),
  status: "ready",
  drill: [
    {
      area: "Any Poppuri Dungeon Map",
      items: [
        { name: "Battery Lasting Long", qty: "10" },
        { name: "Red Petal", qty: "15" },
        { name: "Poppuri Whistle", qty: "15" },
        { name: "Amber", qty: "5", craftPerRound: 10, craftRounds: 2 },
        { qty: "5", icon: pop("05") },
      ],
    },
  ],
  monsters: [
    {
      name: "Kokebi",
      drops: [
        { name: "Toy Box", qty: "1" },
        { qty: "10", icon: pop("25") },
        { qty: "1", note: "ลูกแก้ว 3 แบบในตาราง", icon: pop("30") },
      ],
    },
    {
      icon: pop("07"),
      drops: [
        { qty: "1", icon: pop("16") },
        { qty: "5 each", note: "หิน 3 สี — LVL 36, LVL 39, LVL 136", icon: pop("31") },
      ],
    },
    {
      name: "Larva",
      drops: [
        { name: "Robot Model Kit", qty: "1" },
        { name: "Poisonous Moss", qty: "15" },
      ],
    },
    {
      name: "Sppo",
      drops: [
        { name: "Exchange Diary", qty: "1" },
        { name: "Gold Powder", qty: "5" },
      ],
    },
    { name: "Simbatta", drops: [{ name: "Squeaky Hammer", qty: "1" }] },
    { icon: pop("10"), drops: [{ qty: "15", craftPerRound: 5, icon: pop("20") }] },
    { name: "Turvy", drops: [{ name: "Turvy's Tooth", qty: "15" }] },
    { name: "Koom", drops: [{ name: "Special Whistle", qty: "5" }] },
    {
      icon: pop("13"),
      drops: [
        { qty: "1", craftRounds: 1, note: "+2 เพิ่มอีกชั้นตามตาราง", icon: pop("23") },
        { qty: "2", craftRounds: 1, note: "+2 เพิ่มอีกชั้นตามตาราง", icon: pop("28") },
      ],
    },
  ],
};

/** โซนที่ยังมีแต่ตารางต้นฉบับ รอถอดข้อมูล */
const pending: [string, string, string][] = [
  ["caballa-beach", "ชายหาดคาบาลา", "All CB Fields / Dark Cave"],
  ["caballa-relics", "ซากโบราณ", "Caballa Relics"],
  ["oops-wharf", "ท่าเรืออุ๊ปส์", "Oops Wharf"],
  ["mermaid-palace", "วังเงือก", "Mermaid Palace"],
  ["mirage-island-1", "เกาะมิราจ (1)", "Mirage Island"],
  ["mirage-island-2", "เกาะมิราจ (2)", "Mirage Island / Room of Light"],
  ["ghost-blue", "โกสต์บลู", "Ghost Blue"],
  ["rose-garden", "สวนกุหลาบ", "Rose Garden"],
  ["black-swamp", "หนองน้ำดำ", "Black Swamp"],
  ["dimension-room", "ห้องมิติ", "DRPassages / Control Room"],
  ["snow-hill", "เนินหิมะ", "Snow Hill"],
  ["techichi-volcano", "ภูเขาไฟเทชิชิ", "Techichi Volcano"],
  ["tapasco-volcano", "ภูเขาไฟทาปาสโก", "Tapasco Volcano"],
  ["abyss-fields", "เหวลึก", "Abyss Fields"],
  ["ae-fields", "เอเอฟิลด์", "AE Fields"],
];

export const summaryZones: SummaryZone[] = [
  desertBeach,
  poppuri,
  ...pending.map(([slug, title, titleEn]) => ({
    slug,
    title,
    titleEn,
    image: img(slug),
    status: "soon" as const,
    drill: [],
    monsters: [],
  })),
];

export const readySummaryZones = summaryZones.filter((z) => z.status === "ready");

/** นับจำนวนรายการที่ถอดแล้ว ใช้โชว์ความคืบหน้าบนหน้าเว็บ */
export function summaryCounts() {
  const zones = readySummaryZones;
  const drillItems = zones.reduce((n, z) => n + z.drill.reduce((m, d) => m + d.items.length, 0), 0);
  const monsters = zones.reduce((n, z) => n + z.monsters.length, 0);
  const drops = zones.reduce((n, z) => n + z.monsters.reduce((m, s) => m + s.drops.length, 0), 0);
  return { zones: zones.length, total: summaryZones.length, drillItems, monsters, drops };
}
