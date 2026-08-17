const SOURCES = [
  {
    label: "อัลบั้ม “Ep 0 เควส ชายหาด – ทะเลทราย”",
    href: "https://www.facebook.com/media/set/?set=oa.2119324875486371&type=3",
  },
  {
    label: "อัลบั้ม “EP 1 เควส ซากโบราณ – ท่าเรือ”",
    href: "https://www.facebook.com/media/set/?set=oa.1469326131227407&type=3",
  },
  {
    label: "อัลบั้ม “Episode + Key Quest จำนวนของที่ต้องใช้”",
    href: "https://www.facebook.com/media/set?set=oa.3490341214689969&type=3",
  },
];

export default function SiteFooter() {
  return (
    <footer className="no-print mt-16 border-t border-sand-200 bg-sand-50/70">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-sea-700">
        <p className="font-display text-base font-600 text-coral-600">
          ที่มาของข้อมูล
        </p>
        <p className="mt-1 text-[13px]">
          เนื้อหาทั้งหมดเรียบเรียงจากอัลบั้มภาพของเพจ{" "}
          <span className="font-600">Trickster Adventure</span> บน Facebook
          ไอคอนไอเทม มอนสเตอร์ และ NPC ตัดมาจากภาพต้นฉบับชุดเดียวกัน
          เครดิตข้อมูลและภาพเป็นของผู้ทำอัลบั้มต้นฉบับทั้งหมด
        </p>
        <ul className="mt-3 space-y-1">
          {SOURCES.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sea-500 underline underline-offset-2 hover:text-coral-500"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12px] text-sea-700/70">
          Trickster Online เป็นเครื่องหมายการค้าของเจ้าของลิขสิทธิ์
          เว็บนี้เป็นคู่มือที่ทำโดยผู้เล่นเพื่อผู้เล่น ไม่ได้มีความเกี่ยวข้องกับผู้ให้บริการเกม
        </p>
      </div>
    </footer>
  );
}
