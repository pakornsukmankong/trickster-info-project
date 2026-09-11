"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { SummaryNeed, SummaryZone } from "@/data/summary";
import { monsterIcon } from "@/data/icons";
import ThingIcon from "@/components/ThingIcon";
import Lightbox from "@/components/Lightbox";
import { useProgress } from "@/lib/useProgress";

/** ป้ายจำนวน + เงื่อนไขของหนึ่งรายการ */
function NeedRow({ need, id }: { need: SummaryNeed; id: string }) {
  const { done, toggle } = useProgress();
  const checked = !!done[id];

  return (
    <li
      className={`flex items-start gap-2.5 rounded-lg px-2 py-1.5 transition ${
        checked ? "bg-[#f4fbf5]" : ""
      }`}
    >
      <label className="no-print mt-0.5 shrink-0 cursor-pointer">
        <input
          type="checkbox"
          className="h-3.5 w-3.5 accent-[#4fae62]"
          checked={checked}
          onChange={() => toggle(id)}
          aria-label={`เก็บแล้ว: ${need.name ?? "ของที่ยังไม่ทราบชื่อ"}`}
        />
      </label>

      {need.name ? (
        <ThingIcon name={need.name} size={30} />
      ) : need.icon ? (
        <span
          className="grid h-[30px] w-[30px] shrink-0 place-items-center overflow-hidden rounded-md border border-sand-200 bg-white"
          title="ไอคอนตัดมาจากตารางต้นฉบับ"
        >
          <Image
            src={need.icon}
            alt=""
            aria-hidden
            width={30}
            height={30}
            unoptimized
            className="h-full w-full object-contain"
          />
        </span>
      ) : (
        <span
          className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-md border border-dashed border-sand-300 text-[13px] text-[#b09a86]"
          title="ตารางต้นฉบับมีแต่ไอคอน ยังยืนยันชื่อไม่ได้"
        >
          ?
        </span>
      )}

      <div className="min-w-0 flex-1 text-[13.5px] leading-snug">
        <span className={need.name ? "font-600" : "text-[#8a7565] italic"}>
          {need.name ?? "ยังไม่ทราบชื่อ"}
        </span>
        <span className="ml-1.5 font-600 text-coral-600">×{need.qty}</span>

        {need.craftPerRound !== undefined && (
          <span className="ml-1.5 rounded-full bg-[#ffe3da] px-2 py-0.5 text-[11px] text-[#c1401f]">
            +{need.craftPerRound} ต่อรอบคราฟ
          </span>
        )}
        {need.craftRounds !== undefined && (
          <span className="ml-1.5 rounded-full bg-[#efe6ff] px-2 py-0.5 text-[11px] text-[#5b3fa5]">
            ของคราฟ {need.craftRounds} รอบ
          </span>
        )}
        {need.only && (
          <span className="ml-1.5 rounded-full bg-[#dff0ff] px-2 py-0.5 text-[11px] text-[#12708a]">
            {need.only}
          </span>
        )}
        {need.note && <span className="block text-[12px] text-sea-700">{need.note}</span>}
      </div>
    </li>
  );
}

function ZoneView({ zone }: { zone: SummaryZone }) {
  return (
    <div className="mt-6 space-y-8">
      {zone.drill.length > 0 && (
        <section>
          <h3 className="font-display text-lg font-600 text-[#2f2119]">⛏️ ของที่ต้องขุด</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {zone.drill.map((area) => (
              <div
                key={area.area}
                className="rounded-2xl border border-sand-200 bg-white/85 p-3.5 shadow-sm"
              >
                <h4 className="font-display text-[13px] font-600 uppercase tracking-wide text-[#a06a2c]">
                  {area.area}
                </h4>
                <ul className="mt-2 space-y-1">
                  {area.items.map((it, i) => (
                    <NeedRow
                      key={`${area.area}-${i}`}
                      need={it}
                      id={`sum-${zone.slug}-drill-${area.area}-${i}`}
                    />
                  ))}
                </ul>

                {area.candidates && area.candidates.length > 0 && (
                  <p className="mt-2 border-t border-sand-100 pt-2 text-[12px] leading-relaxed text-sea-700">
                    ไกด์ในเว็บระบุว่าพื้นที่นี้ขุดได้:{" "}
                    <span className="text-[#5b4638]">{area.candidates.join(" · ")}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {zone.monsters.length > 0 && (
        <section>
          <h3 className="font-display text-lg font-600 text-[#2f2119]">⚔️ ของที่ต้องเก็บจากมอน</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {zone.monsters.map((mon, mi) => {
              // มอนที่ระบุตัวได้ใช้สไปรต์จากคลังไอคอน ที่เหลือใช้ภาพที่ตัดจากตาราง
              const icon = (mon.name ? monsterIcon(mon.name) : undefined) ?? mon.icon;
              return (
                <div
                  key={`${mon.name ?? "unknown"}-${mi}`}
                  className="flex flex-col rounded-2xl border border-sand-200 bg-white/85 p-3.5 shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    {icon ? (
                      <Image
                        src={icon}
                        alt=""
                        aria-hidden
                        width={44}
                        height={44}
                        className="h-11 w-11 shrink-0 object-contain"
                      />
                    ) : (
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-dashed border-sand-300 text-[#b09a86]">
                        ?
                      </span>
                    )}
                    <div className="min-w-0">
                      <p
                        className={`font-display text-[15px] font-600 ${
                          mon.name ? "text-[#2f2119]" : "text-[#8a7565] italic"
                        }`}
                      >
                        {mon.name ?? "ยังระบุตัวไม่ได้"}
                      </p>
                      {mon.label && <p className="text-[12px] text-sea-700">{mon.label}</p>}
                    </div>
                  </div>

                  {mon.warning && (
                    <p className="mt-2 rounded-lg bg-[#fff8e6] px-2.5 py-1 text-[12px] text-[#8a6b09]">
                      ⚠️ {mon.warning}
                    </p>
                  )}

                  <ul className="mt-2 space-y-1">
                    {mon.drops.map((d, i) => (
                      <NeedRow
                        key={`${mi}-${i}`}
                        need={d}
                        id={`sum-${zone.slug}-mon-${mi}-${i}`}
                      />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="no-print">
        <h3 className="font-display text-lg font-600 text-[#2f2119]">📋 ตารางต้นฉบับ</h3>
        <p className="mt-1 text-[13px] text-sea-700">
          กดที่ภาพเพื่อขยาย ใช้ตรวจไอคอนของชิ้นที่ยังไม่ทราบชื่อ
        </p>
        <Lightbox images={[zone.image]} alt={`ตาราง ${zone.titleEn}`} />
      </section>
    </div>
  );
}

export default function SummaryBrowser({ zones }: { zones: SummaryZone[] }) {
  const ready = zones.filter((z) => z.status === "ready");
  const [active, setActive] = useState(ready[0]?.slug ?? zones[0].slug);
  const [q, setQ] = useState("");

  const zone = zones.find((z) => z.slug === active)!;

  /** ค้นหาข้ามโซน: บอกว่าของชิ้นนั้นอยู่โซนไหน ต้องใช้กี่ชิ้น */
  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const rows: { zone: SummaryZone; where: string; need: SummaryNeed }[] = [];
    for (const z of zones) {
      for (const area of z.drill) {
        for (const need of area.items) {
          if (need.name?.toLowerCase().includes(needle) || area.area.toLowerCase().includes(needle)) {
            rows.push({ zone: z, where: `ขุดที่ ${area.area}`, need });
          }
        }
      }
      for (const mon of z.monsters) {
        for (const need of mon.drops) {
          if (need.name?.toLowerCase().includes(needle) || mon.name?.toLowerCase().includes(needle)) {
            rows.push({ zone: z, where: `ตี ${mon.name ?? "มอนที่ยังระบุไม่ได้"}`, need });
          }
        }
      }
    }
    return rows;
  }, [zones, q]);

  return (
    <>
      <div className="no-print mt-6">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ค้นหาข้ามทุกโซน เช่น Clam Meat, Golden Mole, DB Field 2…"
          className="w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-[#b09a86] focus:border-coral-400 sm:max-w-md"
        />
      </div>

      {q.trim() ? (
        <div className="mt-5">
          <p className="text-[13px] text-sea-700">
            เจอ {hits.length} รายการ
            {hits.length === 0 && " — ลองพิมพ์ชื่ออังกฤษ หรือชื่อพื้นที่ เช่น DB Field 1"}
          </p>
          <ul className="mt-3 space-y-1.5">
            {hits.map((h, i) => (
              <li
                key={i}
                className="flex flex-wrap items-center gap-2 rounded-xl border border-sand-200 bg-white/85 px-3 py-2 text-[13.5px]"
              >
                <span className="rounded-full bg-sand-200 px-2.5 py-0.5 text-[11px] font-600 text-[#7a5327]">
                  {h.zone.titleEn}
                </span>
                {h.need.name && <ThingIcon name={h.need.name} size={26} />}
                <span className="font-600">{h.need.name ?? "ยังไม่ทราบชื่อ"}</span>
                <span className="font-600 text-coral-600">×{h.need.qty}</span>
                <span className="text-sea-700">{h.where}</span>
                {h.need.only && (
                  <span className="rounded-full bg-[#dff0ff] px-2 py-0.5 text-[11px] text-[#12708a]">
                    {h.need.only}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="no-print mt-5 flex flex-wrap gap-1.5">
            {zones.map((z) => {
              const isActive = z.slug === active;
              const soon = z.status === "soon";
              return (
                <button
                  key={z.slug}
                  type="button"
                  onClick={() => setActive(z.slug)}
                  className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                    isActive
                      ? "bg-coral-500 text-white shadow-sm"
                      : soon
                        ? "border border-dashed border-sand-300 text-[#a89684] hover:bg-sand-100"
                        : "bg-sand-200/70 text-[#7a5327] hover:bg-sand-200"
                  }`}
                  title={soon ? "ยังไม่ได้ถอดข้อมูล มีแต่ตารางต้นฉบับ" : undefined}
                >
                  {z.titleEn}
                  {soon && <span className="ml-1 text-[11px]">•</span>}
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-sand-200 bg-sand-50/60 p-5 sm:p-6">
            <h2 className="font-display text-2xl font-700 text-[#2f2119]">{zone.title}</h2>
            <p className="text-sea-700">{zone.titleEn}</p>

            {zone.status === "soon" ? (
              <div className="mt-5">
                <p className="rounded-xl border border-[#f6dda0] bg-[#fff8e6] px-4 py-3 text-[14px] leading-relaxed text-[#6b5410]">
                  โซนนี้ยังไม่ได้ถอดข้อมูลออกมาเป็นตาราง ดูตารางต้นฉบับไปก่อนได้เลย
                </p>
                <Lightbox images={[zone.image]} alt={`ตาราง ${zone.titleEn}`} />
              </div>
            ) : (
              <ZoneView zone={zone} />
            )}
          </div>
        </>
      )}
    </>
  );
}
