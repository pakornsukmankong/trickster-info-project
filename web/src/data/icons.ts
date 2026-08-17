/**
 * แผนที่ชื่อ -> ไอคอนที่ crop มาจากภาพต้นฉบับ
 *
 * ชื่อในข้อมูลเควสมักมีคำอื่นพ่วงมาด้วย เช่น "ตี Blue Penguin", "500 Galder Coin"
 * จึงจับคู่แบบ "คีย์ที่ยาวที่สุดที่อยู่ในชื่อนั้นชนะ" เพื่อไม่ให้ "peng" ไปแย่งกับ "blue penguin"
 */

const ITEM_ICONS: Record<string, string> = {
  "baby carrot": "baby-carrot",
  "level up guide": "level-up-guide",
  "young egg pet": "young-egg-pet",
  "recovery guide": "recovery-guide",
  "lucky potion": "lucky-potion",
  "galder coin": "galder-coin",
  galder: "galder-coin",
  "pocket pouch": "pocket-pouch",
  "shortcut guide": "shortcut-guide",
  "tanning oil": "tanning-oil",
  peng: "peng",
  "drilling for dummies": "drilling-for-dummies",
  "basic drill": "basic-drill",
  "oasis water": "oasis-water",
  "distilled water": "distilled-water",
  "empty potion bottle": "empty-potion-bottle",
  "life vest": "life-vest",
  "hard scales": "hard-scales",
  "nate's certification": "nates-certification",
  "mature compounding guide": "mature-compounding-guide",
  "ยา b": "potion-b",
  "wooden sword": "wooden-sword",
  "bronze gemstone": "bronze-gemstone",
  "hologram port": "hologram-port",
  "welcome seal": "welcome-seal",
  "wing port": "wing-port",
  "health charm": "health-charm",
  bouquet: "bouquet",
  "bunny card": "bunny-card",
  "cat card": "cat-card",
  "sheep card": "sheep-card",
  "jenny's photo b": "jennys-photo-b",
  "golden mole feather": "golden-mole-feather",
  "written challenge": "written-challenge",
  "red lipstick": "red-lipstick",
  "handkerchief of challenge": "handkerchief-of-challenge",
  "baby bunny": "baby-bunny",
  "strong ring": "strong-ring",
  "clam meat": "clam-meat",
  "magic sealed letter": "magic-sealed-letter",
  "unsealed letter": "unsealed-letter",
  "director's letter": "directors-letter",
  "refining guide": "refining-guide",
  lamb: "lamb",
  kitten: "kitten",
  "smart ring": "smart-ring",
  "solid ring": "solid-ring",

  // Episode 1
  "50 galder coupon": "galder-coupon-50",
  "500 galder coupon": "galder-coupon-500",
  "faded necklace": "faded-necklace",
  honey: "honey",
  "honey tea": "honey-tea",
  ginseng: "ginseng",
  "ginseng tea": "ginseng-tea",
  "royal jelly": "royal-jelly",
  "empty container": "empty-container",
  "fully-filled container": "fully-filled-container",
  gold: "gold",
  "golden egg": "golden-egg",
  "nefertiti's portrait": "nefertiti-portrait",
  "mermaid babe's portrait": "mermaid-babe-portrait",
  "antique mirror": "antique-mirror",
  "fantastic powder": "fantastic-powder",
  "fantastic hand mirror": "fantastic-hand-mirror",
  "chuu~ check": "chuu-check",
  "restored necklace": "restored-necklace",
  "aquamarine pendant": "aquamarine-pendant",
  "unknown old document": "unknown-old-document",
  "thick rope": "thick-rope",
  "piece of lumber": "piece-of-lumber",
  "weird piece 1": "weird-piece-1",
  "weird piece 2": "weird-piece-2",
  "weird piece 3": "weird-piece-3",
  "bell cluster": "bell-cluster",
  "baby powder": "baby-powder",
  "completed box key": "completed-box-key",
  "soil attribute stone": "soil-attribute-stone",
  "light attribute stone": "light-attribute-stone",
  "doc from weird box": "doc-from-weird-box",
  "memo from weird box": "memo-from-weird-box",
  lamplight: "lamplight",
  "diving gear": "diving-gear",
  "harkon keepsake": "harkon-keepsake",
  "harkon necklace": "harkon-necklace",
  "harkon ornament": "harkon-ornament",
  "silk handkerchief": "silk-handkerchief",
  "volcano water": "volcano-water",
  "power plan battery": "power-plan-battery",
};

const MONSTER_ICONS: Record<string, string> = {
  tottochi: "tottochi",
  "blue penguin": "blue-penguin",
  "bad fury": "bad-fury",
  torobbie: "torobbie",
  "hula octopus": "hula-octopus",
  "golden mole": "golden-mole",
  "shell trap": "shell-trap",

  // Episode 1
  "forest wasp": "forest-wasp",
  mimic: "mimic",
  crow: "crow",
  quiem: "quiem",
  "cone stone": "cone-stone",
  naranjo: "naranjo",
  "pirate boxer b": "pirate-boxer-b",
};

const NPC_ICONS: Record<string, string> = {
  heidi: "heidi",
  "bunny maid": "bunny-maid",
  winnie: "winnie",
  "lifeguard deen": "lifeguard-deen",
  tinnie: "tinnie",
  "lifeguard bean": "lifeguard-bean",
  "don giuvanni": "don-giuvanni",
  "driller marky": "driller-marky",
  "officer robert": "officer-robert",
  "compounder paul": "compounder-paul",
  "alchemist nate": "alchemist-nate",
  "blacksmith marx": "blacksmith-marx",
  andrew: "andrew",
  "steve ryu": "steve-ryu",
  "clever owl": "clever-owl",
  "mermaid babe": "mermaid-babe",

  // Episode 1
  "monkey t": "monkey-t",
  "old artist": "old-artist",
  "model mermaid babe": "model-mermaid-babe",
  "rosaline gracia": "rosaline-gracia",
  "guide sabrina": "guide-sabrina",
  "louis bitton": "louis-bitton",
  "love hunter robin": "love-hunter-robin",
  "indiana john": "indiana-john",
  "skipper min": "skipper-min",
  "shaman girl jia": "shaman-girl-jia",
  "vagabond eloy": "vagabond-eloy",
  tango: "tango",
  "item girl": "item-girl",
  marinel: "marinel",
  "explorer reina": "explorer-reina",
};

type Entry = { key: string; src: string };

function toEntries(table: Record<string, string>, dir: string): Entry[] {
  return Object.entries(table)
    .map(([key, file]) => ({ key, src: `/icons/${dir}/${file}.png` }))
    .sort((a, b) => b.key.length - a.key.length);
}

/** ไอเทมกับมอนอยู่ตารางเดียวกัน เพื่อให้คีย์ที่ยาวกว่าชนะข้ามหมวดได้ */
const THING_ENTRIES: Entry[] = [
  ...toEntries(ITEM_ICONS, "items"),
  ...toEntries(MONSTER_ICONS, "monsters"),
].sort((a, b) => b.key.length - a.key.length);

const NPC_ENTRIES = toEntries(NPC_ICONS, "npcs");

/** หาไอคอนของไอเทม/มอนจากชื่อที่อาจมีคำอื่นพ่วงมา */
export function findIcon(name: string): string | undefined {
  const needle = name.toLowerCase();
  return THING_ENTRIES.find((e) => needle.includes(e.key))?.src;
}

export function monsterIcon(name: string): string | undefined {
  const file = MONSTER_ICONS[name.toLowerCase()];
  return file ? `/icons/monsters/${file}.png` : undefined;
}

/** NPC หนึ่งขั้นตอนอาจมีหลายตัว เช่น "Officer Robert / Compounder Paul" */
export function findNpcIcons(npc: string): { name: string; src: string }[] {
  const needle = npc.toLowerCase();
  const hits = NPC_ENTRIES.filter((e) => needle.includes(e.key)).map((e) => ({
    key: e.key,
    src: e.src,
    at: needle.indexOf(e.key),
  }));
  // ตัดคีย์ที่ซ้อนอยู่ในคีย์ที่ยาวกว่าออก แล้วเรียงตามลำดับที่ปรากฏในข้อความ
  const kept = hits.filter(
    (h) => !hits.some((o) => o !== h && o.key.length > h.key.length && o.key.includes(h.key))
  );
  return kept
    .sort((a, b) => a.at - b.at)
    .map((h) => ({
      name: npc.slice(h.at, h.at + h.key.length),
      src: h.src,
    }));
}
