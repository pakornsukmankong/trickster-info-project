import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Kanit, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trickster Info คู่มือเกม Trickster Online",
    template: "%s | Trickster Info",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Trickster Online",
    "คู่มือ Trickster",
    "เควส Trickster",
    "Trickster Info",
    "Caballa Relics",
    "Oops Wharf",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    locale: "th_TH",
    url: "/",
    title: "Trickster Info คู่มือเกม Trickster Online",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Trickster Info คู่มือเกม Trickster Online",
    description: siteDescription,
  },
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
        <Analytics />
      </body>
    </html>
  );
}
