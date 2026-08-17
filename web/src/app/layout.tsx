import type { Metadata } from "next";
import { Kanit, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const display = Kanit({
  variable: "--font-display",
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700"],
});

const body = Noto_Sans_Thai({
  variable: "--font-body",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Trickster Info คู่มือเกม Trickster Online",
    template: "%s | Trickster Info",
  },
  description:
    "คู่มือเกม Trickster Online ภาษาไทย เดินเควสสายหลัก Episode 0 และ Episode 1 แบบทีละขั้น พร้อมข้อมูลไอเทม มอนสเตอร์ NPC และรางวัลครบทุกขั้นตอน",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
