"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Monster } from "@/data/types";
import { monsterIcon } from "@/data/icons";
import { episodeLabel, readyEpisodes } from "@/data/episodes";
import ThingIcon from "@/components/ThingIcon";

const TYPE_STYLE: Record<string, string> = {
  Power: "bg-[#ffdfe6] text-[#b03a63]",
  Magic: "bg-[#e0ecff] text-[#33549e]",
  Sense: "bg-[#efe6ff] text-[#5b3fa5]",
  Charm: "bg-[#ffeccf] text-[#a06a2c]",
  Neutral: "bg-[#e8e4dd] text-[#5f5a52]",
};

export default function MonsterTable({ monsters }: { monsters: Monster[] }) {
  const [guide, setGuide] = useState("all");

  const guides = useMemo(() => {
    const used = new Set(monsters.flatMap((m) => m.guides));
    // เรียงตามลำดับไกด์ในเว็บ ไม่ใช่ลำดับที่มอนโผล่มาก่อน
    return readyEpisodes.filter((e) => used.has(e.slug)).map((e) => e.slug);
  }, [monsters]);

  const rows = useMemo(() => {
    const list = guide === "all" ? monsters : monsters.filter((m) => m.guides.includes(guide));
    return [...list].sort((a, b) => a.level - b.level);
  }, [monsters, guide]);

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {[{ v: "all", l: "ทุกไกด์" }, ...guides.map((g) => ({ v: g, l: episodeLabel[g] ?? g }))].map(
          (o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setGuide(o.v)}
              className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                guide === o.v
                  ? "bg-sea-500 text-white"
                  : "border border-sand-300 bg-white text-sea-700 hover:bg-sand-100"
              }`}
            >
              {o.l}
            </button>
          )
        )}
      </div>

      <p className="mt-3 text-[13px] text-sea-700">พบ {rows.length} ตัว · เรียงตามเลเวล</p>

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
              <th className="px-3 py-3">จุดอ่อน / ต้านทาน</th>
              <th className="px-3 py-3">จุดเกิด</th>
              <th className="px-4 py-3">ของที่ดรอป</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr
                key={m.name}
                className="border-b border-sand-100 align-top last:border-0 hover:bg-sand-50"
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
                  <span className="mt-1 flex flex-wrap gap-1">
                    {m.guides.map((g) => (
                      <span
                        key={g}
                        className="rounded-full bg-sand-100 px-1.5 py-0.5 text-[10px] font-600 text-sea-700"
                      >
                        {episodeLabel[g] ?? g}
                      </span>
                    ))}
                  </span>
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
    </>
  );
}
