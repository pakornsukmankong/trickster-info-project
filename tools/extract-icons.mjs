/**
 * ตรวจจับไอคอนไอเทม / สไปรต์มอนสเตอร์ในภาพต้นฉบับจากอัลบั้ม แล้ว crop ออกมา
 *
 *   node extract-icons.mjs <srcDir> <outDir>
 *
 * วิธีทำงาน: ทำ ink mask (พิกเซลที่ต่างจากพื้นขาว/ลายน้ำ) -> dilate ->
 * หา connected component -> คัดเฉพาะก้อนที่มีขนาด/สัดส่วน/ความอิ่มสีแบบไอคอน
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = process.argv[2];
const OUT = process.argv[3];

const DILATE = 2;
const INK_LUM = 205;   // เข้มกว่านี้ถือว่าเป็นหมึก (ลายน้ำอ่อนกว่านี้จึงถูกตัดทิ้ง)
const INK_CHROMA = 45; // หรือมีสีจัดพอ
const MIN_SIDE = 34;   // ตัวอักษรบรรทัดเดียวสูงไม่เกิน ~30px จึงถูกตัดออก
const MAX_SIDE = 280;
const MIN_ASPECT = 0.4;
const MAX_ASPECT = 2.6;
const MIN_FILL = 0.12;
// ไอคอนบางชิ้นเป็นสีซีด/ขาว ต้องลดเกณฑ์นี้เฉพาะบางภาพ (ตั้งผ่าน MIN_COLOR_RATIO)
const MIN_COLOR_RATIO = Number(process.env.MIN_COLOR_RATIO ?? 0.1);
const ONLY = process.env.ONLY ? new Set(process.env.ONLY.split(",")) : null;

function analyze(data, w, h) {
  const ink = new Uint8Array(w * h);
  const color = new Uint8Array(w * h);
  for (let i = 0, p = 0; i < w * h; i++, p += 3) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const chroma = max - min;
    if (lum < INK_LUM || chroma > INK_CHROMA) ink[i] = 1;
    if (chroma > 42 && lum > 28 && lum < 246) color[i] = 1;
  }
  return { ink, color };
}

function dilate(mask, w, h, radius) {
  // separable box dilation
  const tmp = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let v = 0;
      for (let d = -radius; d <= radius && !v; d++) {
        const xx = x + d;
        if (xx >= 0 && xx < w && mask[y * w + xx]) v = 1;
      }
      tmp[y * w + x] = v;
    }
  }
  const out = new Uint8Array(w * h);
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let v = 0;
      for (let d = -radius; d <= radius && !v; d++) {
        const yy = y + d;
        if (yy >= 0 && yy < h && tmp[yy * w + x]) v = 1;
      }
      out[y * w + x] = v;
    }
  }
  return out;
}

function components(mask, w, h) {
  const seen = new Uint8Array(w * h);
  const stack = new Int32Array(w * h);
  const boxes = [];
  for (let start = 0; start < w * h; start++) {
    if (!mask[start] || seen[start]) continue;
    let top = 0;
    stack[top++] = start;
    seen[start] = 1;
    let minX = w, minY = h, maxX = -1, maxY = -1, area = 0;
    while (top > 0) {
      const idx = stack[--top];
      const x = idx % w;
      const y = (idx - x) / w;
      area++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const n = ny * w + nx;
          if (mask[n] && !seen[n]) {
            seen[n] = 1;
            stack[top++] = n;
          }
        }
      }
    }
    boxes.push({ minX, minY, maxX, maxY, area });
  }
  return boxes;
}

async function processFile(file) {
  const src = path.join(SRC, file);
  const base = path.basename(file, path.extname(file));
  const img = sharp(src).removeAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  const { ink, color } = analyze(data, w, h);
  const grown = dilate(ink, w, h, DILATE);
  const boxes = components(grown, w, h);

  const candidates = [];
  for (const b of boxes) {
    const bw = b.maxX - b.minX + 1;
    const bh = b.maxY - b.minY + 1;
    if (bw < MIN_SIDE || bh < MIN_SIDE) continue;
    if (bw > MAX_SIDE || bh > MAX_SIDE) continue;
    const aspect = bw / bh;
    if (aspect < MIN_ASPECT || aspect > MAX_ASPECT) continue;
    if (b.area / (bw * bh) < MIN_FILL) continue;

    // นับพิกเซลที่มีสีจัดจริง ๆ ภายในกรอบ (ตัดกรอบที่เป็นตัวอักษรล้วน)
    let colored = 0;
    let inkCount = 0;
    for (let y = b.minY; y <= b.maxY; y++) {
      for (let x = b.minX; x <= b.maxX; x++) {
        const i = y * w + x;
        if (ink[i]) inkCount++;
        if (color[i]) colored++;
      }
    }
    if (inkCount === 0) continue;
    const colorRatio = colored / inkCount;
    if (colorRatio < MIN_COLOR_RATIO) continue;

    // ตัดขอบที่ dilate เพิ่มออก แล้วเผื่อ padding เล็กน้อย
    const pad = 2;
    const left = Math.max(0, b.minX + DILATE - pad);
    const topY = Math.max(0, b.minY + DILATE - pad);
    const right = Math.min(w - 1, b.maxX - DILATE + pad);
    const bottom = Math.min(h - 1, b.maxY - DILATE + pad);
    const cw = right - left + 1;
    const ch = bottom - topY + 1;
    if (cw < MIN_SIDE - 6 || ch < MIN_SIDE - 6) continue;

    candidates.push({
      left,
      top: topY,
      width: cw,
      height: ch,
      area: b.area,
      colorRatio: Number(colorRatio.toFixed(2)),
    });
  }

  // เรียงบนลงล่าง ซ้ายไปขวา ให้ตรงกับลำดับที่เห็นในภาพ
  candidates.sort((a, b2) => a.top - b2.top || a.left - b2.left);

  const dir = path.join(OUT, base);
  await mkdir(dir, { recursive: true });

  const meta = [];
  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    const name = `${base}-c${String(i + 1).padStart(2, "0")}.png`;
    await sharp(src)
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .png()
      .toFile(path.join(dir, name));
    meta.push({ index: i + 1, file: name, ...c });
  }

  // contact sheet: เรียงผู้สมัครทั้งหมดพร้อมหมายเลขกำกับ
  if (meta.length) {
    const CELL = 132;
    const LABEL = 20;
    const cols = Math.min(6, meta.length);
    const rows = Math.ceil(meta.length / cols);
    const sheetW = cols * CELL;
    const sheetH = rows * (CELL + LABEL);
    const composites = [];
    for (let i = 0; i < meta.length; i++) {
      const c = candidates[i];
      const cx = (i % cols) * CELL;
      const cy = Math.floor(i / cols) * (CELL + LABEL);
      const scale = Math.min((CELL - 12) / c.width, (CELL - 12) / c.height, 3);
      const tw = Math.max(1, Math.round(c.width * scale));
      const th = Math.max(1, Math.round(c.height * scale));
      const buf = await sharp(src)
        .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
        .resize(tw, th, { kernel: "nearest" })
        .png()
        .toBuffer();
      composites.push({
        input: buf,
        left: cx + Math.round((CELL - tw) / 2),
        top: cy + Math.round((CELL - th) / 2),
      });
    }
    const labels = meta
      .map((m, i) => {
        const cx = (i % cols) * CELL + CELL / 2;
        const cy = Math.floor(i / cols) * (CELL + LABEL) + CELL + 14;
        return `<text x="${cx}" y="${cy}" font-family="monospace" font-size="14" fill="#c1401f" text-anchor="middle">${m.index}</text>`;
      })
      .join("");
    const svg = Buffer.from(
      `<svg width="${sheetW}" height="${sheetH}" xmlns="http://www.w3.org/2000/svg">${labels}</svg>`
    );
    await sharp({
      create: {
        width: sheetW,
        height: sheetH,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    })
      .composite([...composites, { input: svg, left: 0, top: 0 }])
      .png()
      .toFile(path.join(OUT, `sheet-${base}.png`));
  }

  await writeFile(path.join(dir, "meta.json"), JSON.stringify(meta, null, 2));
  return { base, count: meta.length };
}

const files = (await readdir(SRC))
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .filter((f) => !ONLY || ONLY.has(path.basename(f, path.extname(f))))
  .sort();
await mkdir(OUT, { recursive: true });
const results = [];
for (const f of files) results.push(await processFile(f));
console.log(JSON.stringify(results));
