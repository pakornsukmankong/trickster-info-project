import type { Metadata } from "next";
import { allMonsters } from "@/data/monsters";
import MonsterTable from "./MonsterTable";

export const metadata: Metadata = {
  title: "ตารางมอนสเตอร์",
  description:
    "ค่าสถานะ จุดเกิด ธาตุ และของที่ดรอปของมอนสเตอร์ทุกตัวที่ต้องล่าในเควสของ Trickster Online ทั้งเควสเนื้อเรื่องและเควส Sticker",
};

export default function MonstersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-700 text-[#2f2119]">ตารางมอนสเตอร์</h1>
      <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#5b4638]">
        มอนสเตอร์ {allMonsters.length} ตัวที่เควสสั่งให้ไปล่าหรือเก็บของดรอป
        กรองตามไกด์ได้ มอนบางตัวใช้ในหลายไกด์
      </p>

      <MonsterTable monsters={allMonsters} />

      <p className="mt-6 text-[12.5px] text-sea-700">
        หมายเหตุ: มอนใน EP 0 ทุกตัวเป็นแบบไม่ตามตีและไม่มีธาตุประจำตัว
        ส่วนมอนเลเวลสูงใน EP 1 และ Desert Beach หลายตัวมีธาตุและบางตัวตามตี ควรเช็กจุดอ่อนก่อนเข้าไปฟาร์ม
      </p>
    </div>
  );
}
