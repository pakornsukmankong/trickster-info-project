"use client";

import { useProgress } from "@/lib/useProgress";

export default function ProgressBar({
  ids,
  label,
  showReset = false,
}: {
  ids: string[];
  label: string;
  showReset?: boolean;
}) {
  const { done, reset } = useProgress();
  const count = ids.filter((id) => done[id]).length;
  const pct = ids.length === 0 ? 0 : Math.round((count / ids.length) * 100);

  return (
    <div className="no-print rounded-2xl border border-sand-200 bg-white/85 p-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-sm font-600 text-[#2f2119]">{label}</span>
        <span className="text-sm text-sea-700">
          {count} / {ids.length} ขั้นตอน
        </span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-sand-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-leaf-500 to-sea-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showReset && count > 0 && (
        <button
          type="button"
          onClick={() => reset(ids)}
          className="mt-2.5 text-[12.5px] text-sea-500 underline underline-offset-2 hover:text-coral-500"
        >
          ล้างความคืบหน้าส่วนนี้
        </button>
      )}
    </div>
  );
}
