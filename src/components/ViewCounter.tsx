"use client";

import { useEffect, useState } from "react";

/**
 * ตัวนับผู้เข้าชมจาก Abacus — บริการนับฟรีที่เรียกจากเบราว์เซอร์ได้ตรง ๆ
 * ไม่ต้องมี backend หรือฐานข้อมูลของเราเอง
 *
 * - นับเพิ่มครั้งเดียวต่อหนึ่ง session ที่เหลือแค่อ่านค่ามาแสดง (กันนับซ้ำตอนเปลี่ยนหน้า)
 * - ตอน dev อ่านค่าอย่างเดียว ไม่ยิงเพิ่ม เลขจริงจะได้ไม่เพี้ยน
 * - ถ้าบริการล่มหรือโดน ad blocker บล็อก จะไม่แสดงอะไรเลย ไม่ทำให้หน้าเว็บพัง
 *
 * ค่าตั้งต้นสร้างไว้แล้วที่ namespace ด้านล่าง ถ้าเลขโดนปั่นจนเพี้ยน
 * รีเซ็ตได้ด้วย admin key ที่เก็บไว้นอกรีโป (ดู README)
 */

const API = "https://abacus.jasoncameron.dev";
const NAMESPACE = "trickster-info-project.vercel.app";
const KEY = "site-views";
const COUNTED = "trickster-info:counted";

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const counted = sessionStorage.getItem(COUNTED) === "1";
    const shouldCount = !counted && process.env.NODE_ENV === "production";
    const controller = new AbortController();

    fetch(`${API}/${shouldCount ? "hit" : "get"}/${NAMESPACE}/${KEY}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`${res.status}`))))
      .then((data: { value?: unknown }) => {
        if (typeof data.value !== "number") return;
        if (shouldCount) sessionStorage.setItem(COUNTED, "1");
        setViews(data.value);
      })
      .catch(() => {
        // นับไม่ได้ก็ไม่เป็นไร ปล่อยให้ footer ว่างไว้เฉย ๆ
      });

    return () => controller.abort();
  }, []);

  if (views === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-3 py-1 text-[12px] text-sea-700">
      👀 ผู้เข้าชม <span className="font-600 tabular-nums">{views.toLocaleString("th-TH")}</span> ครั้ง
    </span>
  );
}
