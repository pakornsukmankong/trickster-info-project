"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "trickster-adventure:progress";
const EVENT = "trickster-progress-change";

type Progress = Record<string, boolean>;

const EMPTY: Progress = {};

/** แคช snapshot ไว้ให้ useSyncExternalStore ได้ object เดิมเมื่อค่าไม่เปลี่ยน */
let cachedRaw: string | null = null;
let cachedValue: Progress = EMPTY;

function parse(raw: string | null): Progress {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Progress) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): Progress {
  const raw = window.localStorage.getItem(KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
  }
  return cachedValue;
}

function getServerSnapshot(): Progress {
  return EMPTY;
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function write(next: Progress) {
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
}

/**
 * สถานะ "ทำแล้ว" ของแต่ละขั้นตอน เก็บใน localStorage
 * ทุก component ที่ใช้ hook นี้จะซิงก์กันผ่าน custom event
 * (ตอน SSR จะได้ค่าว่างเสมอ แล้วค่อยอัปเดตหลัง hydrate)
 */
export function useProgress() {
  const done = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    const next = { ...parse(window.localStorage.getItem(KEY)) };
    if (next[id]) delete next[id];
    else next[id] = true;
    write(next);
  }, []);

  const reset = useCallback((ids?: string[]) => {
    if (!ids) {
      window.localStorage.removeItem(KEY);
      window.dispatchEvent(new Event(EVENT));
      return;
    }
    const next = { ...parse(window.localStorage.getItem(KEY)) };
    ids.forEach((id) => delete next[id]);
    write(next);
  }, []);

  return { done, toggle, reset };
}
