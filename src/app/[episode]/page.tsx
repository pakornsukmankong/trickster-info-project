import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { episodeLabel, getEpisode, readyEpisodes, stepCount, stepIds } from "@/data/episodes";
import ProgressBar from "@/components/ProgressBar";

export function generateStaticParams() {
  return readyEpisodes.map((e) => ({ episode: e.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[episode]">
): Promise<Metadata> {
  const { episode } = await props.params;
  const ep = getEpisode(episode);
  if (!ep) return { title: "ไม่พบตอนนี้" };
  return {
    title: `${episodeLabel[ep.slug]} — ${ep.title}`,
    description: ep.tagline,
  };
}

export default async function EpisodePage(props: PageProps<"/[episode]">) {
  const { episode } = await props.params;
  const ep = getEpisode(episode);
  if (!ep || ep.status !== "ready") notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-[13px] text-sea-700">
        <Link href="/" className="hover:text-coral-500">
          หน้าแรก
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[#5b4638]">{episodeLabel[ep.slug]}</span>
      </nav>

      <header className="mt-4 rounded-3xl border border-sand-200 bg-white/85 p-7 shadow-sm sm:p-9">
        <span className="inline-block rounded-full bg-coral-500 px-3 py-0.5 text-[12px] font-600 text-white">
          {episodeLabel[ep.slug]}
        </span>
        <h1 className="mt-3 font-display text-3xl font-700 text-[#2f2119] sm:text-4xl">
          {ep.title}
        </h1>
        <p className="text-sea-700">{ep.titleEn}</p>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#5b4638]">
          {ep.tagline}
        </p>
        <p className="mt-4 text-[13px] text-sea-700">
          โซนที่เกี่ยวข้อง: {ep.areas.join(" · ")} · รวม {stepCount(ep)} ขั้นตอน
        </p>
      </header>

      <div className="mt-6">
        <ProgressBar
          ids={stepIds(ep)}
          label={`ความคืบหน้า ${episodeLabel[ep.slug]} ทั้งหมด`}
          showReset
        />
      </div>

      <h2 className="mt-10 font-display text-2xl font-700 text-[#2f2119]">
        บททั้งหมด
      </h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {ep.chapters.map((c) => (
          <Link
            key={c.slug}
            href={`/${ep.slug}/${c.slug}`}
            className="group flex flex-col rounded-2xl border border-sand-200 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-coral-400 hover:shadow-md"
          >
            <span className="inline-block w-fit rounded-full bg-sand-200 px-2.5 py-0.5 text-[11px] font-600 text-[#7a5327]">
              Chapter {c.number}
            </span>
            <h3 className="mt-3 font-display text-xl font-600 text-[#2f2119] group-hover:text-coral-600">
              {c.title}
            </h3>
            <p className="text-[13px] text-sea-700">{c.titleEn}</p>
            <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#5b4638]">
              {c.intro}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[12px]">
              <span className="rounded-full bg-[#dff0ff] px-2.5 py-0.5 text-[#12708a]">
                📍 {c.area}
              </span>
              <span className="rounded-full bg-[#e2f7e5] px-2.5 py-0.5 text-[#2c7a3d]">
                {c.steps.length} ขั้นตอน
              </span>
            </div>
          </Link>
        ))}
      </div>

      {ep.slug === "ep0" && (
        <section className="mt-10 rounded-2xl border border-[#f6dda0] bg-[#fff8e6] p-5">
          <h2 className="font-display text-lg font-600 text-[#8a6b09]">
            ⚠️ บั๊กที่ควรรู้ก่อนเข้าเขตทะเลทราย
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[#6b5410]">
            บางตัวละครจบเควส Driller Marky ไม่ได้ ทำให้รับเควส Don Giuvanni ต่อไม่ผ่าน
            เพราะขาดสมุด <strong>Drilling for Dummies</strong> — แก้ได้โดยให้ตัวละครที่เคยทำแล้ว
            โยนสมุดให้ แล้วจะรับเควสได้ตามปกติ โอกาสติดบั๊กประมาณ 10%
          </p>
        </section>
      )}

      {ep.slug === "ep1" && (
        <section className="mt-10 rounded-2xl border border-[#f6dda0] bg-[#fff8e6] p-5">
          <h2 className="font-display text-lg font-600 text-[#8a6b09]">
            ⚠️ ข้อควรรู้ก่อนเริ่ม EP 1
          </h2>
          <ul className="mt-2 space-y-1.5 text-[14px] leading-relaxed text-[#6b5410]">
            <li>
              ช่วงส่งสร้อยที่ <strong>Old Artist</strong> บังคับให้คุยได้เฉพาะช่วงเวลากลางวันในเกมเท่านั้น
            </li>
            <li>
              <strong>Fantastic Powder</strong> (ผงเขียว) ขุดได้เขตเดียวคือ Relics Field 4 – An Altar for
              Sacrifice
            </li>
          </ul>
        </section>
      )}

      {ep.notes?.length ? (
        <section className="mt-10 rounded-2xl border border-[#f6dda0] bg-[#fff8e6] p-5">
          <h2 className="font-display text-lg font-600 text-[#8a6b09]">
            ⚠️ ข้อควรรู้ก่อนเริ่ม
          </h2>
          <ul className="mt-2 space-y-2 text-[14px] leading-relaxed text-[#6b5410]">
            {ep.notes.map((n) => (
              <li key={n} className="flex gap-2">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#c79a1e]" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
