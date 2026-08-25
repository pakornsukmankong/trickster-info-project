import type { Episode, GuideGroup } from "./types";
import { ep0 } from "./ep0";
import { ep1 } from "./ep1";
import { part1 } from "./part1";
import { part2 } from "./part2";
import { ep2 } from "./ep2";
import { ep3 } from "./ep3";

/** ไกด์ทั้งหมดของเว็บ แบ่งเป็น 2 หมวด: เควสเนื้อเรื่อง (ep) กับเควส Sticker (part) */
export const episodes: Episode[] = [ep0, ep1, ep2, ep3, part1, part2];

export const readyEpisodes = episodes.filter((e) => e.status === "ready");

export const groupLabel: Record<GuideGroup, string> = {
  ep: "เควสเนื้อเรื่อง",
  part: "เควส Sticker",
};

export function guidesInGroup(group: GuideGroup) {
  return readyEpisodes.filter((e) => e.group === group).sort((a, b) => a.number - b.number);
}

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
  episodes.map((e) => [e.slug, e.group === "part" ? `Part ${e.number}` : `EP ${e.number}`])
);
