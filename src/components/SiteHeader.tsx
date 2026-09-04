"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { episodeLabel, guidesInGroup } from "@/data/episodes";

const epGuides = guidesInGroup("ep");
const partGuides = guidesInGroup("part");

const tailLinks = [
  { href: "/monsters", label: "มอนสเตอร์" },
  { href: "/items", label: "ไอเทม" },
];

/** เมนูดรอปดาวน์บนเดสก์ท็อป ใช้ทั้งสำหรับ EP และแผนที่ Sticker */
function NavDropdown({
  label,
  items,
  isActiveGroup,
  isActive,
}: {
  label: string;
  items: { href: string; label: string; sub?: string }[];
  isActiveGroup: boolean;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm transition ${
          isActiveGroup ? "bg-coral-500 text-white shadow-sm" : "text-sea-700 hover:bg-sand-200/70"
        }`}
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-sand-200 bg-white py-1.5 shadow-lg"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex flex-col px-3.5 py-2 text-sm transition ${
                isActive(item.href) ? "bg-coral-50 text-coral-600" : "text-[#2f2119] hover:bg-sand-100"
              }`}
            >
              <span className="font-600">{item.label}</span>
              {item.sub && <span className="text-[12px] text-sea-700">{item.sub}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const epItems = epGuides.map((e) => ({ href: `/${e.slug}`, label: episodeLabel[e.slug], sub: e.title }));
  const partItems = partGuides.map((e) => ({ href: `/${e.slug}`, label: episodeLabel[e.slug], sub: e.title }));

  const isEpActive = epGuides.some((e) => isActive(`/${e.slug}`));
  const isPartActive = partGuides.some((e) => isActive(`/${e.slug}`));

  return (
    <header className="no-print sticky top-0 z-40 border-b border-sand-200/80 bg-sand-50/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Trickster Info หน้าแรก">
          <Image
            src="/brand/trickster-info-logo.png"
            alt="Trickster Info"
            width={1933}
            height={813}
            priority
            className="h-10 w-auto rounded-lg border border-white/70 shadow-sm"
          />
          <span className="hidden text-[11px] leading-tight text-sea-700 sm:block">
            คู่มือเกม
            <br />
            Trickster Online
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 sm:flex">
          <Link
            href="/"
            className={`rounded-full px-3.5 py-1.5 text-sm transition ${
              isActive("/") ? "bg-coral-500 text-white shadow-sm" : "text-sea-700 hover:bg-sand-200/70"
            }`}
          >
            หน้าแรก
          </Link>
          <NavDropdown label="EP" items={epItems} isActiveGroup={isEpActive} isActive={isActive} />
          <NavDropdown label="แผนที่" items={partItems} isActiveGroup={isPartActive} isActive={isActive} />
          {tailLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                isActive(item.href) ? "bg-coral-500 text-white shadow-sm" : "text-sea-700 hover:bg-sand-200/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="เปิดเมนู"
          className="ml-auto rounded-lg border border-sand-300 px-3 py-1.5 text-sm text-sea-700 sm:hidden"
        >
          เมนู
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-sand-200 bg-sand-50 px-4 pb-3 sm:hidden">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`block rounded-lg px-3 py-2 text-sm ${
              isActive("/") ? "bg-coral-500 text-white" : "text-sea-700"
            }`}
          >
            หน้าแรก
          </Link>

          <p className="mt-2 px-3 text-[11px] font-600 uppercase tracking-wide text-sea-700/70">
            เควสเนื้อเรื่อง
          </p>
          {epItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm ${
                isActive(item.href) ? "bg-coral-500 text-white" : "text-sea-700"
              }`}
            >
              {item.label} <span className="text-[12px] opacity-80">— {item.sub}</span>
            </Link>
          ))}

          <p className="mt-2 px-3 text-[11px] font-600 uppercase tracking-wide text-sea-700/70">
            แผนที่ Sticker
          </p>
          {partItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm ${
                isActive(item.href) ? "bg-coral-500 text-white" : "text-sea-700"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-2 border-t border-sand-200 pt-2">
            {tailLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  isActive(item.href) ? "bg-coral-500 text-white" : "text-sea-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
