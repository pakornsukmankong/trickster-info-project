"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Lightbox({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, close]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative h-28 w-28 overflow-hidden rounded-xl border border-sand-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            aria-label={`ขยายภาพต้นฉบับ ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${alt} — ภาพต้นฉบับ ${i + 1}`}
              fill
              sizes="112px"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/45 py-0.5 text-center text-[10px] text-white opacity-0 transition group-hover:opacity-100">
              กดเพื่อซูม
            </span>
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={close}
        >
          <div
            className="relative max-h-full w-full max-w-3xl overflow-auto rounded-2xl bg-white p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={`${alt} — ภาพต้นฉบับ ${index + 1}`}
              width={1000}
              height={1000}
              className="h-auto w-full rounded-lg"
            />
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-sea-700">
                ภาพ {index + 1} / {images.length}
              </span>
              <div className="flex gap-2">
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="rounded-lg border border-sand-300 px-3 py-1"
                      onClick={() =>
                        setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))
                      }
                    >
                      ก่อนหน้า
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-sand-300 px-3 py-1"
                      onClick={() => setIndex((i) => (i === null ? i : (i + 1) % images.length))}
                    >
                      ถัดไป
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="rounded-lg bg-coral-500 px-3 py-1 text-white"
                  onClick={close}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
