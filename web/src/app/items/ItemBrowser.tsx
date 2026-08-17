"use client";

import { useMemo, useState } from "react";
import type { GameItem, ThingKind } from "@/data/types";
import { KindChip } from "@/components/Chip";
import ThingIcon from "@/components/ThingIcon";
import { episodeLabel } from "@/data/episodes";

const FILTERS: { value: ThingKind | "all"; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "item", label: "ไอเทม" },
  { value: "book", label: "สมุด" },
  { value: "equip", label: "อุปกรณ์" },
  { value: "pet", label: "เพ็ท" },
  { value: "potion", label: "ยา" },
  { value: "card", label: "การ์ด" },
];

export default function ItemBrowser({ items }: { items: GameItem[] }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<ThingKind | "all">("all");
  const [episode, setEpisode] = useState<string>("all");

  const episodeOptions = useMemo(() => {
    const slugs = [...new Set(items.map((i) => i.episode))];
    return [
      { value: "all", label: "ทุกตอน" },
      ...slugs.map((s) => ({ value: s, label: episodeLabel[s] ?? s })),
    ];
  }, [items]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((it) => {
      if (kind !== "all" && it.kind !== kind) return false;
      if (episode !== "all" && it.episode !== episode) return false;
      if (!needle) return true;
      return [it.name, it.description, it.howToObtain, it.usedIn, it.compound]
        .filter(Boolean)
        .some((f) => f!.toLowerCase().includes(needle));
    });
  }, [items, q, kind, episode]);

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ค้นหาชื่อไอเทม เช่น Oasis Water, สมุด, ขุด…"
          className="w-full rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-[#b09a86] focus:border-coral-400 sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-1.5">
          {episodeOptions.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => setEpisode(o.value)}
              className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                episode === o.value
                  ? "bg-sea-500 text-white"
                  : "border border-sand-300 bg-white text-sea-700 hover:bg-sand-100"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setKind(f.value)}
              className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                kind === f.value
                  ? "bg-coral-500 text-white"
                  : "border border-sand-300 bg-white text-sea-700 hover:bg-sand-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-[13px] text-sea-700">พบ {filtered.length} รายการ</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((it) => (
          <article
            key={it.name}
            className="rounded-2xl border border-sand-200 bg-white/85 p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <ThingIcon name={it.name} size={52} />
              <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
                <h2 className="font-display text-[16px] font-600 leading-snug text-[#2f2119]">
                  {it.name}
                </h2>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <KindChip kind={it.kind} />
                  <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[10.5px] font-600 text-sea-700">
                    {episodeLabel[it.episode] ?? it.episode}
                  </span>
                </div>
              </div>
            </div>

            {it.description && (
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#5b4638]">
                {it.description}
              </p>
            )}

            {(it.weight !== undefined || it.value !== undefined || it.required) && (
              <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-sea-700">
                {it.required && (
                  <div>
                    <dt className="inline text-[#a08a76]">ต้องการ </dt>
                    <dd className="inline font-600">{it.required}</dd>
                  </div>
                )}
                {it.weight !== undefined && (
                  <div>
                    <dt className="inline text-[#a08a76]">น้ำหนัก </dt>
                    <dd className="inline font-600">{it.weight}</dd>
                  </div>
                )}
                {it.value !== undefined && (
                  <div>
                    <dt className="inline text-[#a08a76]">ราคา </dt>
                    <dd className="inline font-600">{it.value}</dd>
                  </div>
                )}
                {it.compound && (
                  <div>
                    <dt className="inline text-[#a08a76]">Compound </dt>
                    <dd className="inline font-600">{it.compound}</dd>
                  </div>
                )}
              </dl>
            )}

            {it.stats?.length ? (
              <ul className="mt-3 space-y-0.5 rounded-xl bg-sand-50 px-3 py-2 text-[12.5px] text-[#5b4638]">
                {it.stats.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ) : null}

            {it.howToObtain && (
              <p className="mt-3 text-[12.5px] text-sea-700">
                <span className="text-[#a08a76]">ได้มาจาก: </span>
                {it.howToObtain}
              </p>
            )}
            {it.usedIn && (
              <p className="mt-1 text-[12.5px] text-sea-700">
                <span className="text-[#a08a76]">ใช้ทำอะไร: </span>
                {it.usedIn}
              </p>
            )}
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-sea-700">
          ไม่พบไอเทมที่ตรงกับคำค้นหา ลองพิมพ์คำอื่นดูนะ
        </p>
      )}
    </>
  );
}
