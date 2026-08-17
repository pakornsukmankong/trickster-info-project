/** จับคู่ candidate ที่ตรวจจับได้กับชื่อจริง — Episode 1 */
export const ITEMS = {
  "galder-coupon-50": "ep1-01#4",
  "galder-coupon-500": "ep1-04#5",
  "faded-necklace": "ep1-01#5",
  honey: "ep1-02#1",
  ginseng: "ep1-02#2",
  "ginseng-tea": "ep1-13#2",
  "empty-container": "ep1-14#1",
  gold: "ep1-15#1",
  "golden-egg": "ep1-15#4",
  "fully-filled-container": "ep1-15#5",
  "nefertiti-portrait": "ep1-03#2",
  "mermaid-babe-portrait": "ep1-03#3",
  "antique-mirror": "ep1-04#2",
  "fantastic-powder": "ep1-16#4",
  "fantastic-hand-mirror": "ep1-05#1",
  "chuu-check": "ep1-05#3",
  "restored-necklace": "ep1-17#2",
  "aquamarine-pendant": "ep1-17#5",
  "unknown-old-document": "ep1-06#3",
  "honey-tea": "ep1-06#4",
  "piece-of-lumber": "ep1-19#1",
  "weird-piece-1": "ep1-19#2",
  "bell-cluster": "ep1-08#1",
  "weird-piece-2": "ep1-20#1",
  "baby-powder": "ep1-20#4",
  "weird-piece-3": "ep1-09#3",
  "completed-box-key": "ep1-21#1",
  "soil-attribute-stone": "ep1-21#2",
  "weird-box": "ep1-10#1",
  "doc-from-weird-box": "ep1-10#2",
  lamplight: "ep1-22#1",
  "memo-from-weird-box": "ep1-22#4",
  "harkon-necklace": "ep1-23#3",
  "harkon-ornament": "ep1-23#4",
  "diving-gear": "ep1-11#2",
  "harkon-keepsake": "ep1-11#5",
  "silk-handkerchief": "ep1-24#1",
  "volcano-water": "ep1-24#2",
  "power-plan-battery": "ep1-12#1",
};

export const MONSTERS = {
  "forest-wasp": "ep1-02#3",
  mimic: "ep1-15#2",
  crow: "2:ep1-08#4",
  quiem: "ep1-09#1",
  naranjo: "ep1-22#2",
  "pirate-boxer-b": "ep1-12#2",
};

export const NPCS = {
  "monkey-t": "ep1-01#3",
  "old-artist": "ep1-03#1",
  "model-mermaid-babe": "ep1-04#1",
  "rosaline-gracia": "ep1-06#1",
  "guide-sabrina": "ep1-14#2",
  "louis-bitton": "ep1-16#3",
  "love-hunter-robin": "ep1-17#4",
  "indiana-john": "ep1-07#1",
  "skipper-min": "ep1-07#3",
  "shaman-girl-jia": "2:ep1-08#1",
  "vagabond-eloy": "ep1-20#3",
  tango: "ep1-23#2",
  "item-girl": "ep1-11#1",
  marinel: "ep1-11#4",
  "explorer-reina": "ep1-24#3",
};

/** ไอคอนซีดที่ตัวตรวจจับมองไม่เห็น (พิกัดจาก debug-boxes.mjs ที่ ink 222) */
export const MANUAL = {
  items: {
    "royal-jelly": { file: "ep1-18.jpg", left: 190, top: 239, width: 57, height: 57 },
    "thick-rope": { file: "ep1-19.jpg", left: 170, top: 101, width: 60, height: 59 },
    "light-attribute-stone": { file: "ep1-21.jpg", left: 203, top: 602, width: 51, height: 53 },
  },
  monsters: {
    "cone-stone": { file: "ep1-11.jpg", left: 185, top: 520, width: 74, height: 116 },
  },
};

export const ADJUST = {
  // crop ของ Old Artist ติดตัวหนังสือ "Artist" ที่ขอบล่าง ตัดออก
  "npcs/old-artist": { left: 0, top: 0, width: 230, height: 86 },
};
