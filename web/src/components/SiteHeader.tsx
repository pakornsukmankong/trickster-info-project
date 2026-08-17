"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "หน้าแรก" },
  { href: "/ep0", label: "EP 0" },
  { href: "/ep1", label: "EP 1" },
  { href: "/monsters", label: "มอนสเตอร์" },
  { href: "/items", label: "ไอเทม" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                isActive(item.href)
                  ? "bg-coral-500 text-white shadow-sm"
                  : "text-sea-700 hover:bg-sand-200/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="เปิดเมนู"
          className="ml-auto rounded-lg border border-sand-300 px-3 py-1.5 text-sm text-sea-700 sm:hidden"
        >
          เมนู
        </button>
      </div>

      {open && (
        <nav className="border-t border-sand-200 bg-sand-50 px-4 pb-3 sm:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm ${
                isActive(item.href)
                  ? "bg-coral-500 text-white"
                  : "text-sea-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
