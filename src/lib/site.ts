/**
 * URL ของเว็บสำหรับ metadata / sitemap
 *
 * - ตั้ง NEXT_PUBLIC_SITE_URL เองเมื่อผูกโดเมนจริง
 * - บน Vercel จะใช้ VERCEL_PROJECT_PRODUCTION_URL ที่ระบบใส่ให้อัตโนมัติ
 * - ตอน dev ตกมาที่ localhost
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteName = "Trickster Info";

export const siteDescription =
  "คู่มือเกม Trickster Online ภาษาไทย เดินเควสสายหลัก Episode 0 และ Episode 1 แบบทีละขั้น พร้อมข้อมูลไอเทม มอนสเตอร์ NPC และรางวัลครบทุกขั้นตอน";
