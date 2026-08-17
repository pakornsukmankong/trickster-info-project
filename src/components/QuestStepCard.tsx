"use client";

import Image from "next/image";
import type { QuestStep } from "@/data/types";
import { findNpcIcons } from "@/data/icons";
import { Chip, KindChip } from "./Chip";
import ThingIcon from "./ThingIcon";
import Lightbox from "./Lightbox";
import { useProgress } from "@/lib/useProgress";

const CLASS_EMOJI: Record<string, string> = {
  Bunny: "🐰",
  Cat: "🐱",
  Sheep: "🐑",
  Dragon: "🐲",
  Buffalo: "🐃",
  Fox: "🦊",
  Lion: "🦁",
  Raccoon: "🦝",
};

export default function QuestStepCard({
  step,
  index,
}: {
  step: QuestStep;
  index: number;
}) {
  const { done, toggle } = useProgress();
  const checked = !!done[step.id];
  const npcs = findNpcIcons(step.npc);

  return (
    <article
      id={step.id}
      className={`scroll-mt-24 rounded-2xl border bg-white/85 p-5 shadow-sm transition ${
        checked ? "border-leaf-500/50 bg-[#f4fbf5]" : "border-sand-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-sm font-700 ${
            checked ? "bg-leaf-500 text-white" : "bg-sand-200 text-[#7a5327]"
          }`}
        >
          {index}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-600 leading-snug text-[#2f2119]">
            {step.title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip tone="coral">👤 {step.npc}</Chip>
            <Chip tone="sea">📍 {step.location}</Chip>
            {step.classOnly && (
              <Chip tone="grape">
                {CLASS_EMOJI[step.classOnly] ?? "✨"} เฉพาะสาย {step.classOnly}
              </Chip>
            )}
          </div>
        </div>

        <label className="no-print flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-sand-300 px-3 py-1.5 text-[12px] text-sea-700 select-none">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 accent-[#4fae62]"
            checked={checked}
            onChange={() => toggle(step.id)}
          />
          ทำแล้ว
        </label>
      </div>

      {npcs.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {npcs.map((n) => (
            <figure
              key={n.src}
              className="overflow-hidden rounded-xl border border-sand-200 bg-white"
            >
              <Image
                src={n.src}
                alt={`${n.name} และจุดที่ยืนบนมินิแมป`}
                width={220}
                height={130}
                className="h-[86px] w-auto object-contain"
              />
              <figcaption className="border-t border-sand-100 bg-sand-50 px-2 py-1 text-center text-[11px] text-sea-700">
                {n.name}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <ul className="mt-4 space-y-1.5 text-[15px] leading-relaxed">
        {step.summary.map((line) => (
          <li key={line} className="flex gap-2">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {(step.requirements?.length || step.rewards?.length) && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {step.requirements?.length ? (
            <section className="rounded-xl border border-sand-200 bg-sand-50/70 p-3.5">
              <h4 className="font-display text-[13px] font-600 uppercase tracking-wide text-[#a06a2c]">
                ของที่ต้องใช้
              </h4>
              <ul className="mt-2 space-y-2.5 text-[14px]">
                {step.requirements.map((r) => (
                  <li key={r.name} className="flex gap-2.5">
                    <ThingIcon name={r.name} size={34} />
                    <div className="min-w-0">
                      <span className="font-600">{r.name}</span>
                      {r.qty && <span className="text-coral-600"> × {r.qty}</span>}
                      {r.from && (
                        <span className="block text-[12.5px] text-sea-700">↳ {r.from}</span>
                      )}
                      {r.note && (
                        <span className="block text-[12.5px] text-sea-700">{r.note}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {step.rewards?.length ? (
            <section className="rounded-xl border border-[#cfe9d5] bg-[#f4fbf5] p-3.5">
              <h4 className="font-display text-[13px] font-600 uppercase tracking-wide text-[#2c7a3d]">
                รางวัลที่ได้
              </h4>
              <ul className="mt-2 space-y-2.5 text-[14px]">
                {step.rewards.map((r) => (
                  <li key={r.name} className="flex gap-2.5">
                    <ThingIcon name={r.name} size={34} />
                    <div className="min-w-0 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                      {r.kind && <KindChip kind={r.kind} />}
                      <span className="font-600">{r.name}</span>
                      {r.qty && <span className="text-coral-600">{r.qty}</span>}
                      {r.note && (
                        <span className="w-full text-[12.5px] text-sea-700">{r.note}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}

      {step.tips?.length ? (
        <div className="mt-4 rounded-xl border border-[#f6dda0] bg-[#fff8e6] p-3.5">
          <h4 className="font-display text-[13px] font-600 text-[#8a6b09]">⚠️ ข้อควรรู้</h4>
          <ul className="mt-1.5 space-y-1.5 text-[13.5px] leading-relaxed">
            {step.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <Lightbox images={step.images} alt={step.title} />
    </article>
  );
}
