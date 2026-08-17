import type { Metadata } from "next";
import Image from "next/image";
import type { Monster } from "@/data/types";
import { ep0Monsters, ep1Monsters, allMonsters } from "@/data/monsters";
import { monsterIcon } from "@/data/icons";
import ThingIcon from "@/components/ThingIcon";

export const metadata: Metadata = {
  title: "ตารางมอนสเตอร์",
  description:
    "ค่าสถานะ จุดเกิด ธาตุ และของที่ดรอปของมอนสเตอร์ทุกตัวที่ต้องล่าในเควส Episode 0 และ Episode 1 ของ Trickster Online",
};

const TYPE_STYLE: Record<string, string> = {
  Power: "bg-[#ffdfe6] text-[#b03a63]",
  Magic: "bg-[#e0ecff] text-[#33549e]",
  Sense: "bg-[#efe6ff] text-[#5b3fa5]",
  Charm: "bg-[#ffeccf] text-[#a06a2c]",
};

function MonsterTable({ monsters }: { monsters: Monster[] }) {
  return (
    <div className="scroll-x mt-4 rounded-2xl border border-sand-200 bg-white/85 shadow-sm">
      <table className="w-full min-w-[1040px] text-left text-sm">
        <thead>
          <tr className="border-b border-sand-200 bg-sand-100/70 font-display text-[12px] uppercase tracking-wide text-[#7a5327]">
            <th className="px-4 py-3" colSpan={2}>
              ชื่อ
            </th>
            <th className="px-3 py-3">สาย</th>
            <th className="px-3 py-3 text-right">Lv.</th>
            <th className="px-3 py-3 text-right">HP</th>
            <th className="px-3 py-3 text-right">AP</th>
            <th className="px-3 py-3 text-right">DP</th>
            <th className="px-3 py-3 text-right">MD</th>
            <th className="px-3 py-3 text-right">GD</th>
            <th className="px-3 py-3">จุดอ่อน / ต้านทาน</th>
            <th className="px-3 py-3">จุดเกิด</th>
            <th className="px-4 py-3">ของที่ดรอป</th>
          </tr>
        </thead>
        <tbody>
          {monsters.map((m) => (
            <tr
              key={m.name}
              className="border-b border-sand-100 last:border-0 align-top hover:bg-sand-50"
            >
              <td className="py-2 pl-4 pr-0">
                {monsterIcon(m.name) && (
                  <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl border border-sand-200 bg-white">
                    <Image
                      src={monsterIcon(m.name)!}
                      alt={m.name}
                      width={56}
                      height={56}
                      className="h-full w-full object-contain p-1"
                    />
                  </span>
                )}
              </td>
              <td className="px-3 py-3">
                <span className="font-600 text-[#2f2119]">{m.name}</span>
                {m.aggressive && (
                  <span className="mt-1 block w-fit rounded-full bg-[#ffe3da] px-2 py-0.5 text-[10.5px] font-600 text-[#c1401f]">
                    ตามตี
                  </span>
                )}
                {m.element && (
                  <span className="mt-1 block text-[11.5px] text-sea-700">{m.element}</span>
                )}
              </td>
              <td className="px-3 py-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-600 ${
                    TYPE_STYLE[m.type] ?? "bg-sand-200 text-[#7a5327]"
                  }`}
                >
                  {m.type}
                </span>
              </td>
              <td className="px-3 py-3 text-right tabular-nums">{m.level}</td>
              <td className="px-3 py-3 text-right tabular-nums">{m.hp.toLocaleString()}</td>
              <td className="px-3 py-3 text-right tabular-nums">{m.ap}</td>
              <td className="px-3 py-3 text-right tabular-nums">{m.dp}</td>
              <td className="px-3 py-3 text-right tabular-nums">{m.md}</td>
              <td className="px-3 py-3 text-right tabular-nums">{m.gd}</td>
              <td className="px-3 py-3 text-[12.5px] text-sea-700">
                {m.weakness ? (
                  <>
                    <span className="text-[#c1401f]">อ่อน:</span> {m.weakness}
                    <br />
                    <span className="text-[#2c7a3d]">ต้าน:</span> {m.resistance ?? "—"}
                  </>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-3 py-3 text-[12.5px] text-sea-700">
                {m.locations.join(" / ")}
                {m.notes && <span className="mt-1 block text-[11.5px]">{m.notes}</span>}
              </td>
              <td className="px-4 py-3 text-[13px]">
                {m.drops?.length ? (
                  <ul className="space-y-1">
                    {m.drops.map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <ThingIcon name={d} size={28} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MonstersPage() {
  const groups = [
    { key: "ep0", label: "Episode 0 — ชายหาดถึงทะเลทราย", monsters: ep0Monsters },
    { key: "ep1", label: "Episode 1 — ซากโบราณถึงเมืองท่า", monsters: ep1Monsters },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-700 text-[#2f2119]">ตารางมอนสเตอร์</h1>
      <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#5b4638]">
        มอนสเตอร์ {allMonsters.length} ตัวที่เควสสั่งให้ไปล่าหรือเก็บของดรอป
        เรียงตามเลเวลจากน้อยไปมากในแต่ละตอน
      </p>

      {groups.map((g) => (
        <section key={g.key} className="mt-10">
          <h2 className="font-display text-xl font-600 text-[#2f2119]">{g.label}</h2>
          <MonsterTable monsters={g.monsters} />
        </section>
      ))}

      <p className="mt-6 text-[12.5px] text-sea-700">
        หมายเหตุ: มอนใน EP 0 ทุกตัวเป็นแบบไม่ตามตีและไม่มีธาตุประจำตัว
        ส่วนมอนเลเวลสูงใน EP 1 ส่วนใหญ่ตามตีและมีธาตุ ควรเช็กจุดอ่อนก่อนเข้าไปฟาร์ม
      </p>
    </div>
  );
}
