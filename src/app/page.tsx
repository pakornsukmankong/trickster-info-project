import Link from "next/link";
import { episodeLabel, guidesInGroup, readyEpisodes, stepCount } from "@/data/episodes";
import type { GuideGroup } from "@/data/types";
import { allMonsters } from "@/data/monsters";
import { allItems } from "@/data/items";

const totalSteps = readyEpisodes.reduce((n, e) => n + stepCount(e), 0);
const totalChapters = readyEpisodes.reduce((n, e) => n + e.chapters.length, 0);

const GROUPS: { key: GuideGroup; heading: string; blurb: string }[] = [
  {
    key: "ep",
    heading: "เควสเนื้อเรื่อง (EP)",
    blurb: "สายหลักของเกม เดินตามเนื้อเรื่องไปทีละเมือง",
  },
  {
    key: "part",
    heading: "เควส Sticker",
    blurb: "เควสสะสมสติกเกอร์ เน้นส่งของ ทำหลังจากผ่านเควสเนื้อเรื่องของเมืองนั้นแล้ว",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <section className="rounded-3xl border border-sand-200 bg-white/80 p-7 shadow-sm sm:p-10">
        <p className="font-display text-sm font-600 tracking-wide text-sea-500">
          คู่มือเดินเควส Trickster Online ภาษาไทย
        </p>
        <h1 className="mt-2 font-display text-3xl font-700 leading-tight text-[#2f2119] sm:text-5xl">
          จาก <span className="text-coral-600">Coral Town</span> ถึงใต้ทะเล{" "}
          <span className="text-sea-500">Mermaid Palace</span>
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#5b4638] sm:text-base">
          รวมขั้นตอนเควสสายหลักแบบทีละสเต็ป บอกครบว่าต้องคุยกับ NPC ตัวไหน
          อยู่แผนที่อะไร ต้องหาของอะไรกี่ชิ้น และจบแล้วได้รางวัลอะไรบ้าง
          พร้อมรูปไอเทม มอนสเตอร์ และภาพต้นฉบับให้กดดูเทียบได้ทุกขั้นตอน
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/ep0"
            className="rounded-xl bg-coral-500 px-5 py-2.5 font-display text-sm font-600 text-white shadow-sm transition hover:bg-coral-600"
          >
            เริ่มอ่าน Episode 0 →
          </Link>
          <Link
            href="/part-1"
            className="rounded-xl border border-sand-300 bg-white px-5 py-2.5 font-display text-sm font-600 text-sea-700 transition hover:bg-sand-100"
          >
            ดูเควส Sticker Desert Beach (Lv.25)
          </Link>
        </div>

        <dl className="mt-8 grid gap-3 sm:grid-cols-4">
          {[
            { k: "ตอนที่พร้อมอ่าน", v: `${readyEpisodes.length} ตอน` },
            { k: "บททั้งหมด", v: `${totalChapters} บท` },
            { k: "ขั้นตอนเควส", v: `${totalSteps} ขั้น` },
            {
              k: "ข้อมูลอ้างอิง",
              v: `${allMonsters.length} มอน · ${allItems.length} ไอเทม`,
            },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-sand-200 bg-sand-50/80 px-4 py-3"
            >
              <dt className="text-[12px] text-sea-700">{s.k}</dt>
              <dd className="font-display text-lg font-600 text-[#2f2119]">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {GROUPS.map((g) => (
        <section key={g.key} className="mt-12">
          <h2 className="font-display text-2xl font-700 text-[#2f2119]">{g.heading}</h2>
          <p className="mt-1 text-[14px] text-[#5b4638]">{g.blurb}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {guidesInGroup(g.key).map((ep) => (
              <Link
                key={ep.slug}
                href={`/${ep.slug}`}
                className="group rounded-2xl border border-sand-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-coral-400 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-600 text-white ${
                      g.key === "part" ? "bg-grape-500" : "bg-coral-500"
                    }`}
                  >
                    {episodeLabel[ep.slug]}
                  </span>
                  {ep.levelHint && (
                    <span className="rounded-full bg-sand-200 px-2.5 py-0.5 text-[11px] font-600 text-[#7a5327]">
                      {ep.levelHint}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-xl font-600 text-[#2f2119] group-hover:text-coral-600">
                  {ep.title}
                </h3>
                <p className="text-[13px] text-sea-700">{ep.titleEn}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[#5b4638]">
                  {ep.tagline}
                </p>
                <p className="mt-3 text-[12.5px] text-sea-700">
                  โซน: {ep.areas.join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/monsters"
          className="rounded-2xl border border-sand-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sea-300 hover:shadow-md"
        >
          <h3 className="font-display text-lg font-600 text-[#2f2119]">
            🐾 ตารางมอนสเตอร์
          </h3>
          <p className="mt-1 text-[14px] text-[#5b4638]">
            ค่าสถานะ จุดเกิด ธาตุ และของที่ดรอปของมอนทุกตัวในเควส
          </p>
        </Link>
        <Link
          href="/items"
          className="rounded-2xl border border-sand-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sea-300 hover:shadow-md"
        >
          <h3 className="font-display text-lg font-600 text-[#2f2119]">
            🎒 คลังไอเทม
          </h3>
          <p className="mt-1 text-[14px] text-[#5b4638]">
            ของใช้ สมุด อุปกรณ์ และเพ็ททุกชิ้นที่โผล่ในเควส ค้นหาและกรองได้
          </p>
        </Link>
      </section>
    </div>
  );
}
