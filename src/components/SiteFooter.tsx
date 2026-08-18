import ViewCounter from "./ViewCounter";

const GROUP_URL = "https://www.facebook.com/groups/1193501945887369";
const CHANNEL_URL = "https://www.youtube.com/@flokzchannel";

export default function SiteFooter() {
  return (
    <footer className="no-print mt-16 border-t border-sand-200 bg-sand-50/70">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-sea-700">
        <p className="font-display text-base font-600 text-coral-600">
          ที่มาของข้อมูล
        </p>
        <p className="mt-1 text-[13px]">
          เนื้อหาทั้งหมดเรียบเรียงจากอัลบั้มภาพของกลุ่ม{" "}
          <span className="font-600">Trickster Adventure</span> บน Facebook
          ไอคอนไอเทม มอนสเตอร์ และ NPC ตัดมาจากภาพต้นฉบับชุดเดียวกัน
          เครดิตข้อมูลและภาพเป็นของผู้ทำอัลบั้มต้นฉบับทั้งหมด
        </p>
        <p className="mt-3">
          <a
            href={GROUP_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sea-500 underline underline-offset-2 hover:text-coral-500"
          >
            จากกลุ่ม Trickster Adventure
          </a>
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-sand-200 pt-5">
          <p className="text-[13px]">
            เว็บนี้ทำโดย{" "}
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="font-600 text-coral-600 underline underline-offset-2 hover:text-coral-500"
            >
              FLOKZ CHANNEL
            </a>
          </p>
          <ViewCounter />
        </div>

        <p className="mt-4 text-[12px] text-sea-700/70">
          Trickster Online เป็นเครื่องหมายการค้าของเจ้าของลิขสิทธิ์
          เว็บนี้เป็นคู่มือที่ทำโดยผู้เล่นเพื่อผู้เล่น ไม่ได้มีความเกี่ยวข้องกับผู้ให้บริการเกม
        </p>
      </div>
    </footer>
  );
}
