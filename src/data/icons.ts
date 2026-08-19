/**
 * แผนที่ชื่อ -> ไอคอนที่ crop มาจากภาพต้นฉบับ
 *
 * ชื่อในข้อมูลเควสมักมีคำอื่นพ่วงมาด้วย เช่น "ตี Blue Penguin", "500 Galder Coin"
 * จึงจับคู่แบบ "คีย์ที่ยาวที่สุดที่อยู่ในชื่อนั้นชนะ" เพื่อไม่ให้ "peng" ไปแย่งกับ "blue penguin"
 */

import { npcIconSizes, npcMapSizes } from "./npcIconSizes";

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

  // Part 1
  "shell shield neo": "shell-shield-neo",
  "desert sticker": "desert-sticker",
  "flower necklace": "flower-necklace",
  "octopus legs": "octopus-legs",
  "sun cream": "sun-cream",
  soap: "soap",
  shampoo: "shampoo",
  "pineapple mask": "pineapple-mask",
  limestone: "limestone",
  "garden trowel": "garden-trowel",
  "sand cake": "sand-cake",
  "sand glass": "sand-glass",
  "toy box": "toy-box",
  "teddy bear": "teddy-bear",
  "robot model kit": "robot-model-kit",
  "exchange diary": "exchange-diary",
  "squeaky hammer": "squeaky-hammer",
  "multi-vitamin": "multi-vitamin",
  "red petal": "red-petal",
  "gold powder": "gold-powder",
  "talky mushroom": "talky-mushroom",
  "poisonous moss": "poisonous-moss",
  amber: "amber",
  "flying weight": "flying-weight",
  "lapis penna": "lapis-penna",
  "ancient dice": "ancient-dice",
  "tortoise shell": "tortoise-shell",
  "ancient jar": "ancient-jar",
  malachite: "malachite",
  selinolite: "selinolite",
  "patterned pottery": "patterned-pottery",
  "plain pottery": "plain-pottery",
  "incense burner": "incense-burner",
  "ash box": "ash-box",
  millet: "millet",
  "aposis statue": "aposis-statue",
  "coffee beans": "coffee-beans",
  "julio's key": "julios-key",

  // Part 2
  "blue soul bottle": "blue-soul-bottle",
  "red soul bottle": "red-soul-bottle",
  "crow's claw": "crows-claw",
  "sea ivory": "sea-ivory",
  "sea palace ticket": "sea-palace-ticket",
  "tiger blanket": "tiger-blanket",
  "turtle shell": "turtle-shell",
  "ironclad turtle's egg": "ironclad-turtles-egg",
  "pirate hood": "pirate-hood",
  "pirate eye patch": "pirate-eye-patch",
  "black feather": "black-feather",
  "pirate towel": "pirate-towel",
  "golden eyepatch": "golden-eyepatch",
  "stone ginseng": "stone-ginseng",
  waterworm: "waterworm",
  "premium limestone": "premium-limestone",
  "turtle medicine": "turtle-medicine",
  "black herbal medicine": "black-herbal-medicine",
  "a boy's dream": "a-boys-dream",
  "a girl's wish": "a-girls-wish",
  "voyage log p25": "voyage-log-p25",
  "voyage log p31": "voyage-log-p31",
  "old unsigned letter": "old-unsigned-letter",
  "old picture": "old-picture",
  "lip gloss": "lip-gloss",
  "fragmented map 1": "fragmented-map-1",
  "fragmented map 2": "fragmented-map-2",
  "tink's fishbone": "tinks-fishbone",
  "bell's fishbone": "bells-fishbone",
  "sea herbs": "sea-herbs",
  "royal mermaid linen": "royal-mermaid-linen",
  "nail polish": "nail-polish",
  "fur brush": "fur-brush",
  bubble: "bubble",
  pearl: "pearl",
  "sulaphat's shell": "sulaphats-shell",
  "okto's staff": "oktos-staff",
  "tanya's sword": "tanyas-sword",
  "chele's claw": "cheles-claw",
  "water pistol gun": "water-pistol-gun",
  crystal: "crystal",
  "light pink coral": "light-pink-coral",
  "mermaid's feather": "mermaids-feather",
  "whale sinew": "whale-sinew",
  "premium wine": "premium-wine",
  "premium liquor": "premium-liquor",
  "cash box": "cash-box",
  "cure for sleepwalking": "cure-for-sleepwalking",
  "monguse helmet": "monguse-helmet",
  "black gunpowder": "black-gunpowder",
  "hair curling iron": "hair-curling-iron",
  "merrow's trunk": "merrows-trunk",
  "merrow's gills": "merrows-gills",
  "maid's scales": "maids-scales",
  "transparent cloth": "transparent-cloth",
  "nora's reed": "noras-reed",
  "steel piece": "steel-piece",
  hook: "hook",
  "fragmented map 3": "fragmented-map-3",
  "bronze nora stone": "bronze-nora-stone",
  "silver nora stone": "silver-nora-stone",
  "gold nora stone": "gold-nora-stone",
  "nora bandage": "nora-bandage",
  "nora doll": "nora-doll",
  "nora sprayer": "nora-sprayer",
  kryptonite: "kryptonite",
  "r stone": "r-stone",
  "y stone": "y-stone",
  "b stone": "b-stone",
  "p stone": "p-stone",
  "g stone": "g-stone",
  "herb potion": "herb-potion",
  "gold pearl potion": "gold-pearl-potion",
  "pure water": "pure-water",
  "whale essence": "whale-essence",
  "dead man's incense": "dead-mans-incense",
  "ghost blue spirit": "ghost-blue-spirit",

  // Episode 0 — Welcome Seal 4-8 + สายตัวละคร
  salt: "salt",
  "salted dry fish": "salted-dry-fish",
  earthworm: "earthworm",
  "scorpion jerky": "scorpion-jerky",
  "twinkle star": "twinkle-star",
  "illegal cd": "illegal-cd",
  "color pencils": "color-pencils",
  pen: "pen",
  postcard: "postcard",
  swimsuit: "swimsuit",
  "signed agreement": "signed-agreement",
  "accurate ring": "accurate-ring",
  "fox card": "fox-card",
  "lion card": "lion-card",
  "buffalo card": "buffalo-card",
  "dragon card": "dragon-card",
  "raccoon card": "raccoon-card",
  "fox pup": "fox-pup",
  "lion cub": "lion-cub",
  "buffalo calf": "buffalo-calf",
  "dragon whelp": "dragon-whelp",
  "raccoon cub": "raccoon-cub",

  // Episode 1 — สาย Fairy Nono
  "special polisher": "special-polisher",
  "nono's note": "nonos-note",
  "harkon shard": "harkon-shard",
  "super bean shell": "super-bean-shell",
  "fairy's drink": "fairys-drink",
  "transparent medicine": "transparent-medicine",
  "nono ring": "nono-ring",
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

  // Part 1
  "sea scorpion": "sea-scorpion",
  pineapple: "pineapple",
  "sand demon": "sand-demon",
  pochi: "pochi",
  kokebi: "kokebi",
  simbatta: "simbatta",
  turvy: "turvy",
  sppo: "sppo",
  "moss moth": "moss-moth",
  "leaf bird": "leaf-bird",
  larva: "larva",
  koom: "koom",
  aposis: "aposis",
  guiana: "guiana",
  lima: "lima",
  chibcha: "chibcha",

  // Part 2
  "ironclad turtle": "ironclad-turtle",
  "sea tiger": "sea-tiger",
  requi: "requi",
  "black foe": "black-foe",
  "super golden mole": "super-golden-mole",
  "master foe": "master-foe",
  "mermaid little": "mermaid-little",
  "fish guardian tink": "fish-guardian-tink",
  "fish guardian bell": "fish-guardian-bell",
  "merman ale": "merman-ale",
  "waterweed witch": "waterweed-witch",
  sulaphat: "sulaphat",
  chele: "chele",
  okto: "okto",
  tanya: "tanya",
  "popeyed anemone": "popeyed-anemone",
  "armor squirt": "armor-squirt",
  "torpedo fish": "torpedo-fish",
  "cora pyupyu": "cora-pyupyu",
  "bad anemone": "bad-anemone",
  merrow: "merrow",
  siremaid: "siremaid",
  "pirate ghost": "pirate-ghost",
  "nora joe": "nora-joe",
  "nora mummy": "nora-mummy",
  "nora big": "nora-big",

  // Episode 0 — Welcome Seal 4-8 + สายตัวละคร
  "fanta slime": "fanta-slime",
  "fanta fish": "fanta-fish",
  "grumpy octopus": "grumpy-octopus",
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

  // Part 1
  sandman: "sandman",
  "homeless ian": "homeless-ian",
  "miranda watty": "miranda-watty",
  "scared popuri": "scared-popuri",
  "keeper julio": "keeper-julio",

  // Part 2
  "mighty captain stan": "mighty-captain-stan",
  "captain stan": "captain-stan",
  "fortune teller": "fortune-teller",
  "merchant miguel": "merchant-miguel",
  rosemary: "rosemary",
  sophia: "sophia",
  "officer tera": "officer-tera",
  "frog shaman": "frog-shaman",
  lethos: "lethos",
  "genius cochma": "genius-cochma",
  "la vida": "la-vida",
  "prince sebastian": "prince-sebastian",
  "sea spirit rumo": "sea-spirit-rumo",
  "fairy asrai": "fairy-asrai",
  "mermaid marin": "mermaid-marin",
  "guard gilbert": "guard-gilbert",
  "chief koha": "chief-koha",
  "sissy viole": "sissy-viole",
  "banker lisa": "banker-lisa",
  favian: "favian",
  vinosh: "vinosh",
  "weepy nora": "weepy-nora",
  mint: "mint",

  // Episode 0 — Welcome Seal 4-8 + สายตัวละคร
  kristoffer: "kristoffer-j",
  dorothy: "dorothy",

  // Episode 1 — สาย Fairy Nono
  "fairy nono": "fairy-nono",
};

type Entry = { key: string; file: string; src: string };

function toEntries(table: Record<string, string>, dir: string): Entry[] {
  return Object.entries(table)
    .map(([key, file]) => ({ key, file, src: `/icons/${dir}/${file}.png` }))
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

export interface NpcIcon {
  name: string;
  src: string;
  /** ขนาดจริงของไฟล์ ใช้บอก next/image และดูว่าภาพถูกขยายเกินตัวไหม */
  width: number;
  height: number;
  /** มินิแมปที่ปักหมุดจุดที่ NPC ยืน (บางตัวไม่มี) */
  map?: { src: string; width: number; height: number };
}

/** NPC หนึ่งขั้นตอนอาจมีหลายตัว เช่น "Officer Robert / Compounder Paul" */
export function findNpcIcons(npc: string): NpcIcon[] {
  const needle = npc.toLowerCase();
  const hits = NPC_ENTRIES.filter((e) => needle.includes(e.key)).map((e) => ({
    key: e.key,
    file: e.file,
    src: e.src,
    at: needle.indexOf(e.key),
  }));
  // ตัดคีย์ที่ซ้อนอยู่ในคีย์ที่ยาวกว่าออก แล้วเรียงตามลำดับที่ปรากฏในข้อความ
  const kept = hits.filter(
    (h) =>
      !hits.some(
        (o) => o !== h && o.key.length > h.key.length && o.key.includes(h.key),
      ),
  );
  return kept
    .sort((a, b) => a.at - b.at)
    .map((h) => {
      const [width, height] = npcIconSizes[h.file] ?? [220, 130];
      return {
        name: npc.slice(h.at, h.at + h.key.length),
        src: h.src,
        width,
        height,
        map: npcMapSizes[h.file]
          ? {
              src: `/icons/maps/${h.file}.png`,
              width: npcMapSizes[h.file][0],
              height: npcMapSizes[h.file][1],
            }
          : undefined,
      };
    });
}
