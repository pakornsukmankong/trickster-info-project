export type ClassLine = "Bunny" | "Cat" | "Sheep" | "Dragon" | "Buffalo" | "Fox" | "Lion" | "Raccoon";

export type ThingKind =
  | "item"      // ของใช้ / ไอเทมเควส
  | "book"      // สมุด
  | "equip"     // อุปกรณ์สวมใส่
  | "pet"       // สัตว์เลี้ยง
  | "card"      // การ์ด
  | "money"     // เงิน Galder
  | "potion";   // ยา

/** ของที่ต้องหา / ต้องส่งให้ NPC */
export interface Requirement {
  name: string;
  qty?: string;
  /** ได้มาจากไหน เช่น "ตี Torobbie", "ขุดที่ Delta Island" */
  from?: string;
  note?: string;
}

/** ของที่ได้รับหลังจบเควส */
export interface Reward {
  name: string;
  qty?: string;
  kind?: ThingKind;
  note?: string;
}

export interface QuestStep {
  id: string;
  /** ชื่อขั้นตอนแบบสั้น ใช้เป็นหัวการ์ด */
  title: string;
  /** NPC ที่ต้องคุยด้วย */
  npc: string;
  /** แผนที่/โซนที่ NPC อยู่ */
  location: string;
  /** สรุปสิ่งที่ต้องทำ 1-3 บรรทัด */
  summary: string[];
  requirements?: Requirement[];
  rewards?: Reward[];
  /** ข้อควรระวัง / ทิปส์ */
  tips?: string[];
  /** เควสเฉพาะสายตัวละคร */
  classOnly?: ClassLine;
  /** ภาพต้นฉบับจากอัลบั้ม (path ใน /public) */
  images: string[];
}

export interface Chapter {
  slug: string;
  number: number;
  title: string;
  titleEn: string;
  area: string;
  intro: string;
  levelHint: string;
  steps: QuestStep[];
}

/** หมวดของไกด์ — เควสเนื้อเรื่องหลัก (EP) กับเควสสะสมสติกเกอร์ (Part) */
export type GuideGroup = "ep" | "part";

export interface Episode {
  slug: string;
  /** หมวด: ep = เควสเนื้อเรื่อง, part = เควส Sticker */
  group: GuideGroup;
  number: number;
  title: string;
  titleEn: string;
  tagline: string;
  /** เลเวลที่เริ่มทำได้ */
  levelHint?: string;
  areas: string[];
  /** ข้อควรรู้รวมของไกด์ทั้งอัน แสดงบนหน้าภาพรวม */
  notes?: string[];
  chapters: Chapter[];
  status: "ready" | "soon";
}

export interface Monster {
  name: string;
  /** ไกด์ที่มอนตัวนี้โผล่ (มอนตัวเดียวอาจใช้หลายไกด์) */
  guides: string[];
  type: "Power" | "Magic" | "Sense" | "Charm";
  level: number;
  hp: number;
  ap: number;
  ma: number;
  dp: number;
  md: number;
  gd: number;
  aggressive: boolean;
  /** ธาตุประจำตัว เช่น "Earth 15%" */
  element?: string;
  weakness?: string;
  resistance?: string;
  locations: string[];
  drops?: string[];
  notes?: string;
}

export interface GameItem {
  name: string;
  /** ตอนที่ไอเทมนี้โผล่ในเควส */
  episode: string;
  kind: ThingKind;
  /** ค่าพลัง/คุณสมบัติที่ผสมได้ (Compound Ability) */
  compound?: string;
  weight?: number;
  value?: number;
  required?: string;
  description?: string;
  howToObtain?: string;
  /** ค่าสถานะสำหรับของสวมใส่ / เพ็ท */
  stats?: string[];
  usedIn?: string;
}
