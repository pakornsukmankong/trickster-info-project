import type { Metadata } from "next";
import { allItems } from "@/data/items";
import ItemBrowser from "./ItemBrowser";

export const metadata: Metadata = {
  title: "คลังไอเทม",
  description:
    "รวมไอเทม สมุด อุปกรณ์ ยา และเพ็ททุกชิ้นที่ปรากฏในเควส Episode 0 และ Episode 1 ของ Trickster Online พร้อมวิธีหาและจุดที่ใช้",
};

export default function ItemsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-700 text-[#2f2119]">คลังไอเทม</h1>
      <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#5b4638]">
        ของ {allItems.length} ชิ้นที่ผ่านมือระหว่างเดินเควส EP 0 และ EP 1
        บอกทั้งค่าสถานะ วิธีหา และจุดที่ต้องเอาไปใช้
      </p>
      <ItemBrowser items={allItems} />
    </div>
  );
}
