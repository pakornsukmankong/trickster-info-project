import type { Metadata } from "next";
import { summaryCounts, summaryZones } from "@/data/summary";
import SummaryBrowser from "./SummaryBrowser";

export const metadata: Metadata = {
  title: "สรุปของที่ต้องเก็บ",
  description:
    "สรุปว่าแต่ละโซนของ Trickster Online ต้องขุดอะไรกี่ชิ้น และต้องเก็บของอะไรจากมอนตัวไหนบ้าง พร้อมเงื่อนไขสายตัวละครและจำนวนที่ใช้คราฟ",
};

export default function SummaryPage() {
  const counts = summaryCounts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-700 text-[#2f2119]">สรุปของที่ต้องเก็บ</h1>
      <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#5b4638]">
        ตารางรวมว่าแต่ละโซนต้องขุดอะไรกี่ชิ้น และต้องตีมอนตัวไหนเพื่อเก็บของอะไร
        พร้อมเงื่อนไขสายตัวละคร จำนวนที่กินต่อรอบคราฟ และคำเตือนเลเวล ติ๊กเก็บความคืบหน้าได้
      </p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-4">
        {[
          { k: "โซนที่ถอดข้อมูลแล้ว", v: `${counts.zones} / ${counts.total} โซน` },
          { k: "จุดขุด", v: `${counts.drillItems} รายการ` },
          { k: "มอนที่ต้องตี", v: `${counts.monsters} ตัว` },
          { k: "ของที่ต้องเก็บจากมอน", v: `${counts.drops} รายการ` },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl border border-sand-200 bg-sand-50/80 px-4 py-3">
            <dt className="text-[12px] text-sea-700">{s.k}</dt>
            <dd className="font-display text-lg font-600 text-[#2f2119]">{s.v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 rounded-xl border border-[#f6dda0] bg-[#fff8e6] px-4 py-3 text-[13.5px] leading-relaxed text-[#6b5410]">
        ตารางต้นฉบับมีแต่ไอคอน ไม่ได้เขียนชื่อของไว้ ชื่อที่ขึ้นในหน้านี้ยืนยันแล้วจากข้อมูลมอนและไกด์ในเว็บ
        ส่วนชิ้นที่ยังยืนยันไม่ได้จะขึ้นว่า <span className="font-600">ยังไม่ทราบชื่อ</span> พร้อมจำนวนที่ต้องใช้
        กดดูตารางต้นฉบับของโซนนั้นเทียบไอคอนได้
      </p>

      <SummaryBrowser zones={summaryZones} />
    </div>
  );
}
