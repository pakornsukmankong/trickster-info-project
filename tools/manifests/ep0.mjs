/** จับคู่ candidate ที่ตรวจจับได้กับชื่อจริง — Episode 0 */
export const ITEMS = {
  "lucky-potion": "ep0-02#2",
  "recovery-guide": "ep0-02#4",
  "galder-coin": "ep0-02#5",
  "level-up-guide": "ep0-13#1",
  "baby-carrot": "ep0-13#2",
  "young-egg-pet": "ep0-14#2",
  "pocket-pouch": "ep0-16#1",
  "shortcut-guide": "ep0-16#2",
  "tanning-oil": "ep0-04#3",
  peng: "ep0-17#1",
  "drilling-for-dummies": "ep0-17#2",
  "basic-drill": "ep0-17#4",
  "oasis-water": "ep0-05#2",
  "distilled-water": "ep0-05#3",
  "empty-potion-bottle": "ep0-05#4",
  "life-vest": "ep0-18#2",
  "hard-scales": "ep0-18#3",
  "nates-certification": "2:ep0-19#1",
  "mature-compounding-guide": "ep0-19#1",
  "potion-b": "ep0-19#3",
  "wooden-sword": "ep0-19#5",
  "bronze-gemstone": "ep0-07#3",
  "hologram-port": "ep0-07#5",
  "welcome-seal": "ep0-20#2",
  "wing-port": "ep0-20#3",
  "health-charm": "ep0-20#4",
  bouquet: "ep0-08#3",
  "bunny-card": "ep0-08#2",
  "cat-card": "ep0-22#2",
  "sheep-card": "ep0-11#2",
  "jennys-photo-b": "ep0-22#4",
  "golden-mole-feather": "ep0-11#3",
  "written-challenge": "ep0-21#2",
  "red-lipstick": "ep0-21#4",
  "handkerchief-of-challenge": "ep0-09#1",
  "baby-bunny": "ep0-09#3",
  "strong-ring": "ep0-09#4",
  "clam-meat": "ep0-10#3",
  "magic-sealed-letter": "ep0-24#3",
  "unsealed-letter": "ep0-12#1",
  lamb: "ep0-12#2",
  "smart-ring": "ep0-12#3",
  kitten: "2:ep0-23#1",
  "solid-ring": "ep0-23#1",
};

export const MONSTERS = {
  tottochi: "ep0-02#6",
  "blue-penguin": "ep0-03#4",
  "bad-fury": "ep0-15#5",
  torobbie: "ep0-13#3",
  "hula-octopus": "ep0-08#4",
  "golden-mole": "ep0-11#4",
  "shell-trap": "ep0-10#4",
};

export const NPCS = {
  heidi: "ep0-01#1",
  "bunny-maid": "ep0-01#2",
  winnie: "ep0-14#1",
  "lifeguard-deen": "ep0-02#1",
  tinnie: "ep0-15#1",
  "lifeguard-bean": "ep0-03#1",
  "don-giuvanni": "ep0-04#1",
  "driller-marky": "ep0-04#2",
  "officer-robert": "ep0-06#2",
  "compounder-paul": "ep0-06#3",
  "alchemist-nate": "ep0-18#4",
  "blacksmith-marx": "ep0-07#1",
  andrew: "ep0-20#1",
  "steve-ryu": "ep0-08#1",
  "clever-owl": "ep0-11#1",
  "mermaid-babe": "ep0-21#3",
};

/** ไอคอนสีขาว/ซีดที่ตัวตรวจจับมองไม่เห็น ต้องระบุกรอบเอง (พิกัดจาก debug-boxes.mjs ที่ ink 218) */
export const MANUAL = {
  items: {
    "refining-guide": { file: "ep0-07.jpg", left: 148, top: 350, width: 56, height: 63 },
    "directors-letter": { file: "ep0-23.jpg", left: 121, top: 187, width: 63, height: 38 },
  },
};

/** ตัดส่วนเกินออกจาก crop ที่ได้มา (พิกัดอิงไฟล์ผลลัพธ์) */
export const ADJUST = {
  // crop ของ Marx ติดตัวหนังสือ "Marx" มาด้วย ตัดเหลือเฉพาะตัว NPC
  "npcs/blacksmith-marx": { left: 62, top: 0, width: 55, height: 81 },
};
