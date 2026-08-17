import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <span className="text-5xl">🧭</span>
      <h1 className="mt-4 font-display text-3xl font-700 text-[#2f2119]">
        หาหน้านี้ไม่เจอ
      </h1>
      <p className="mt-2 text-[15px] text-[#5b4638]">
        อาจจะเดินหลงเข้าไปในถ้ำผิดทาง ลองกลับไปตั้งต้นที่หน้าแรกดูนะ
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-coral-500 px-5 py-2.5 font-display text-sm font-600 text-white transition hover:bg-coral-600"
      >
        กลับหน้าแรก
      </Link>
    </div>
  );
}
