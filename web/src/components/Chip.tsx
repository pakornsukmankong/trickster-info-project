import type { ThingKind } from "@/data/types";

const KIND_STYLE: Record<ThingKind, string> = {
  item: "bg-sand-200 text-[#7a5327]",
  book: "bg-[#efe6ff] text-[#5b3fa5]",
  equip: "bg-[#dff0ff] text-[#12708a]",
  pet: "bg-[#ffe6ee] text-[#b03a63]",
  card: "bg-[#fff0d0] text-[#8a5a09]",
  money: "bg-[#fdf3c8] text-[#8a6b09]",
  potion: "bg-[#e2f7e5] text-[#2c7a3d]",
};

const KIND_LABEL: Record<ThingKind, string> = {
  item: "ไอเทม",
  book: "สมุด",
  equip: "อุปกรณ์",
  pet: "เพ็ท",
  card: "การ์ด",
  money: "เงิน",
  potion: "ยา",
};

export function KindChip({ kind }: { kind: ThingKind }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-2 py-0.5 text-[11px] font-600 ${KIND_STYLE[kind]}`}
    >
      {KIND_LABEL[kind]}
    </span>
  );
}

export function Chip({
  children,
  tone = "sand",
}: {
  children: React.ReactNode;
  tone?: "sand" | "sea" | "coral" | "leaf" | "grape";
}) {
  const tones = {
    sand: "bg-sand-200 text-[#7a5327]",
    sea: "bg-[#dff0ff] text-[#12708a]",
    coral: "bg-[#ffe3da] text-[#c1401f]",
    leaf: "bg-[#e2f7e5] text-[#2c7a3d]",
    grape: "bg-[#efe6ff] text-[#5b3fa5]",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-500 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
