import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter, readyEpisodes } from "@/data/episodes";
import QuestStepCard from "@/components/QuestStepCard";
import ProgressBar from "@/components/ProgressBar";

export function generateStaticParams() {
  return readyEpisodes.flatMap((e) =>
    e.chapters.map((c) => ({ episode: e.slug, chapter: c.slug }))
  );
}

export async function generateMetadata(
  props: PageProps<"/[episode]/[chapter]">
): Promise<Metadata> {
  const { episode, chapter } = await props.params;
  const found = getChapter(episode, chapter);
  if (!found) return { title: "ไม่พบบทนี้" };
  return {
    title: `EP${found.episode.number} บทที่ ${found.chapter.number} — ${found.chapter.title}`,
    description: found.chapter.intro,
  };
}

export default async function ChapterPage(
  props: PageProps<"/[episode]/[chapter]">
) {
  const { episode, chapter } = await props.params;
  const found = getChapter(episode, chapter);
  if (!found) notFound();

  const { episode: ep, chapter: c } = found;
  const index = ep.chapters.findIndex((x) => x.slug === c.slug);
  const prev = ep.chapters[index - 1];
  const next = ep.chapters[index + 1];
  const ids = c.steps.map((s) => s.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav className="text-[13px] text-sea-700">
        <Link href="/" className="hover:text-coral-500">
          หน้าแรก
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/${ep.slug}`} className="hover:text-coral-500">
          Episode {ep.number}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-[#5b4638]">บทที่ {c.number}</span>
      </nav>

      <header className="mt-4 rounded-3xl border border-sand-200 bg-white/85 p-7 shadow-sm">
        <span className="inline-block rounded-full bg-sand-200 px-3 py-0.5 text-[12px] font-600 text-[#7a5327]">
          EP {ep.number} · Chapter {c.number}
        </span>
        <h1 className="mt-3 font-display text-3xl font-700 text-[#2f2119]">
          {c.title}
        </h1>
        <p className="text-sea-700">{c.titleEn}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-[#5b4638]">{c.intro}</p>
        <div className="mt-4 flex flex-wrap gap-1.5 text-[12px]">
          <span className="rounded-full bg-[#dff0ff] px-2.5 py-0.5 text-[#12708a]">
            📍 {c.area}
          </span>
          <span className="rounded-full bg-[#ffe3da] px-2.5 py-0.5 text-[#c1401f]">
            ⚔️ {c.levelHint}
          </span>
          <span className="rounded-full bg-[#e2f7e5] px-2.5 py-0.5 text-[#2c7a3d]">
            {c.steps.length} ขั้นตอน
          </span>
        </div>
      </header>

      <div className="mt-6">
        <ProgressBar ids={ids} label={`ความคืบหน้าบทที่ ${c.number}`} showReset />
      </div>

      <ol className="mt-6 space-y-5">
        {c.steps.map((s, i) => (
          <li key={s.id}>
            <QuestStepCard step={s} index={i + 1} />
          </li>
        ))}
      </ol>

      <nav className="no-print mt-10 flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          <Link
            href={`/${ep.slug}/${prev.slug}`}
            className="rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-sea-700 transition hover:bg-sand-100"
          >
            ← บทที่ {prev.number}: {prev.title}
          </Link>
        ) : (
          <Link
            href={`/${ep.slug}`}
            className="rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm text-sea-700 transition hover:bg-sand-100"
          >
            ← กลับหน้า Episode {ep.number}
          </Link>
        )}
        {next && (
          <Link
            href={`/${ep.slug}/${next.slug}`}
            className="rounded-xl bg-coral-500 px-4 py-2.5 text-sm font-600 text-white transition hover:bg-coral-600"
          >
            บทที่ {next.number}: {next.title} →
          </Link>
        )}
      </nav>
    </div>
  );
}
