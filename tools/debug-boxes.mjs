/** ดูรายการ connected component ทั้งหมดของภาพเดียว ใช้ตอนจูนพารามิเตอร์ */
import sharp from "sharp";

const file = process.argv[2];
const DILATE = Number(process.argv[3] ?? 3);
const LUM_T = Number(process.argv[4] ?? 232);
const CHROMA_T = Number(process.argv[5] ?? 26);

const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width, h = info.height;

const ink = new Uint8Array(w * h);
const color = new Uint8Array(w * h);
for (let i = 0, p = 0; i < w * h; i++, p += 3) {
  const r = data[p], g = data[p + 1], b = data[p + 2];
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum < LUM_T || max - min > CHROMA_T) ink[i] = 1;
  if (max - min > 42 && lum > 28 && lum < 246) color[i] = 1;
}

function dilate(mask, radius) {
  const tmp = new Uint8Array(w * h);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let d = -radius; d <= radius && !v; d++) {
        const xx = x + d;
        if (xx >= 0 && xx < w && mask[y * w + xx]) v = 1;
      }
      tmp[y * w + x] = v;
    }
  const out = new Uint8Array(w * h);
  for (let x = 0; x < w; x++)
    for (let y = 0; y < h; y++) {
      let v = 0;
      for (let d = -radius; d <= radius && !v; d++) {
        const yy = y + d;
        if (yy >= 0 && yy < h && tmp[yy * w + x]) v = 1;
      }
      out[y * w + x] = v;
    }
  return out;
}

const grown = DILATE > 0 ? dilate(ink, DILATE) : ink;
const seen = new Uint8Array(w * h);
const stack = new Int32Array(w * h);
const boxes = [];
for (let start = 0; start < w * h; start++) {
  if (!grown[start] || seen[start]) continue;
  let top = 0;
  stack[top++] = start;
  seen[start] = 1;
  let minX = w, minY = h, maxX = -1, maxY = -1, area = 0;
  while (top > 0) {
    const idx = stack[--top];
    const x = idx % w, y = (idx - x) / w;
    area++;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const n = ny * w + nx;
        if (grown[n] && !seen[n]) { seen[n] = 1; stack[top++] = n; }
      }
  }
  const bw = maxX - minX + 1, bh = maxY - minY + 1;
  let colored = 0, inkCount = 0;
  for (let y = minY; y <= maxY; y++)
    for (let x = minX; x <= maxX; x++) {
      const i = y * w + x;
      if (ink[i]) inkCount++;
      if (color[i]) colored++;
    }
  boxes.push({ x: minX, y: minY, w: bw, h: bh, area, cr: inkCount ? +(colored / inkCount).toFixed(2) : 0 });
}
boxes.sort((a, b) => b.area - a.area);
console.log(`size ${w}x${h}, components ${boxes.length}`);
console.log(JSON.stringify(boxes.slice(0, 40)));
