import Image from "next/image";
import { findIcon } from "@/data/icons";

/** ไอคอนไอเทม/มอนขนาดเล็กในบรรทัดข้อความ ถ้าไม่มีรูปจะไม่แสดงอะไรเลย */
export default function ThingIcon({
  name,
  size = 28,
  src,
}: {
  name: string;
  size?: number;
  src?: string;
}) {
  const resolved = src ?? findIcon(name);
  if (!resolved) return null;
  return (
    <span
      className="inline-grid shrink-0 place-items-center overflow-hidden rounded-md border border-sand-200 bg-white"
      style={{ width: size, height: size }}
    >
      <Image
        src={resolved}
        alt=""
        aria-hidden
        width={size}
        height={size}
        className="h-full w-full object-contain"
        style={{ imageRendering: "auto" }}
      />
    </span>
  );
}
