import type { Episode } from "./types";
import { ep0 } from "./ep0";
import { ep1 } from "./ep1";

export const episodes: Episode[] = [ep0, ep1];

export const readyEpisodes = episodes.filter((e) => e.status === "ready");

export function getEpisode(slug: string) {
  return episodes.find((e) => e.slug === slug);
}

export function getChapter(episodeSlug: string, chapterSlug: string) {
  const episode = getEpisode(episodeSlug);
  const chapter = episode?.chapters.find((c) => c.slug === chapterSlug);
  return episode && chapter ? { episode, chapter } : undefined;
}

export function stepCount(episode: Episode) {
  return episode.chapters.reduce((n, c) => n + c.steps.length, 0);
}

export function stepIds(episode: Episode) {
  return episode.chapters.flatMap((c) => c.steps.map((s) => s.id));
}

/** ชื่อสั้นสำหรับติดป้ายในหน้าไอเทม/มอนสเตอร์ */
export const episodeLabel: Record<string, string> = Object.fromEntries(
  episodes.map((e) => [e.slug, `EP ${e.number}`])
);
