/**
 * สร้าง favicon / apple icon จากโลโก้ Trickster Info
 *
 *   node make-icons.mjs <logo.png> <web/src/app>
 *
 * โลโก้เป็นแนวนอนยาว ~2.4:1 ย่อลงช่องไอคอนสี่เหลี่ยมแล้วตัวหนังสืออ่านไม่ออก
 * จึงตัดเฉพาะแมวมาสคอตด้านขวา แล้วคีย์พื้นหลังฟ้าออกให้เหลือเงาแมวโปร่งใส
 * ก่อนวางบนพื้นไล่สีโทนเดียวกับโลโก้
 */
import sharp from "sharp";
import path from "node:path";

const [LOGO, APP_DIR] = process.argv.slice(2);

// กรอบแมวในไฟล์โลโก้ต้นฉบับ (1933x813)
const CAT = { left: 1672, top: 168, width: 240, height: 466 };

/** แมวเป็นเขียวมะกอกตัดเส้นดำ ส่วนพื้นหลังฟ้าและตัวอักษร "o" ที่ล้ำเข้ามาเป็นฟ้า/เหลือง/ขาว */
function isCat(r, g, b) {
  const dark = Math.max(r, g, b) < 110;
  const olive = b < 130 && g > 100 && g < 235 && r > 80 && r < 215 && g - b > 40 && r < g + 40;
  return dark || olive;
}

/** morphology แบบ separable — ใช้กัดเส้นบางของตัวอักษรที่แตะตัวแมวออก */
function morph(mask, w, h, radius, op) {
  const pick = op === "erode" ? (a, b) => a && b : (a, b) => a || b;
  const seed = op === "erode" ? 1 : 0;
  const pass = (src) => {
    const tmp = new Uint8Array(w * h);
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        let v = seed;
        for (let d = -radius; d <= radius; d++) {
          const xx = x + d;
          const s = xx >= 0 && xx < w ? src[y * w + xx] : op === "erode" ? 1 : 0;
          v = pick(v, s) ? 1 : 0;
        }
        tmp[y * w + x] = v;
      }
    const out = new Uint8Array(w * h);
    for (let x = 0; x < w; x++)
      for (let y = 0; y < h; y++) {
        let v = seed;
        for (let d = -radius; d <= radius; d++) {
          const yy = y + d;
          const s = yy >= 0 && yy < h ? tmp[yy * w + x] : op === "erode" ? 1 : 0;
          v = pick(v, s) ? 1 : 0;
        }
        out[y * w + x] = v;
      }
    return out;
  };
  return pass(mask);
}

/** เก็บเฉพาะก้อนที่ใหญ่ที่สุด เพื่อตัดเศษตัวอักษรที่ติดมาในกรอบออก */
function largestComponent(mask, w, h) {
  const seen = new Uint8Array(w * h);
  const stack = new Int32Array(w * h);
  let best = null;

  for (let start = 0; start < w * h; start++) {
    if (!mask[start] || seen[start]) continue;
    let top = 0;
    stack[top++] = start;
    seen[start] = 1;
    const pixels = [];
    while (top > 0) {
      const idx = stack[--top];
      pixels.push(idx);
      const x = idx % w;
      const y = (idx - x) / w;
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
    if (!best || pixels.length > best.length) best = pixels;
  }

  const kept = new Uint8Array(w * h);
  best?.forEach((i) => (kept[i] = 1));
  return kept;
}

async function cutoutCat() {
  const { data, info } = await sharp(LOGO)
    .extract(CAT)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h } = info;
  const mask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (isCat(data[i * 3], data[i * 3 + 1], data[i * 3 + 2])) mask[i] = 1;
  }

  // กัดเส้นบาง ๆ ออกก่อนเลือกก้อนใหญ่สุด แล้วขยายกลับมาทาบกับ mask เดิมเพื่อคงขอบคมของตัวแมว
  const seed = largestComponent(morph(mask, w, h, 3, "erode"), w, h);
  const grown = morph(seed, w, h, 4, "dilate");
  const kept = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) kept[i] = grown[i] && mask[i] ? 1 : 0;

  const rgba = Buffer.alloc(w * h * 4);
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let i = 0; i < w * h; i++) {
    rgba[i * 4] = data[i * 3];
    rgba[i * 4 + 1] = data[i * 3 + 1];
    rgba[i * 4 + 2] = data[i * 3 + 2];
    rgba[i * 4 + 3] = kept[i] ? 255 : 0;
    if (kept[i]) {
      const x = i % w;
      const y = (i - x) / w;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  return sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .png()
    .toBuffer();
}

async function render(cat, size, outFile) {
  // พื้นไล่สีโทนเดียวกับโลโก้
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="0.4" y2="1">
           <stop offset="0%" stop-color="#c9f0f4"/>
           <stop offset="55%" stop-color="#93dfeb"/>
           <stop offset="100%" stop-color="#7fd2e4"/>
         </linearGradient>
       </defs>
       <rect width="${size}" height="${size}" fill="url(#g)"/>
     </svg>`
  );

  // แมวเป็นทรงสูงแคบ ต้องดันให้เกือบเต็มความสูง ไม่งั้นย่อเหลือ 16px แล้วจะเล็กจนไม่เห็น
  const catH = Math.round(size * 0.94);
  const scaled = await sharp(cat)
    .resize({ height: catH, fit: "inside", kernel: "lanczos3" })
    .png()
    .toBuffer();
  const meta = await sharp(scaled).metadata();

  await sharp(bg)
    .composite([
      {
        input: scaled,
        left: Math.round((size - meta.width) / 2),
        top: Math.round((size - meta.height) / 2),
      },
    ])
    .png()
    .toFile(outFile);

  return { size, catW: meta.width, catH: meta.height };
}

/** ภาพพรีวิวตอนแชร์ลิงก์ 1200x630 — ใช้โลโก้เต็มวางบนพื้นไล่สีเดียวกัน */
async function renderOgImage(outFile) {
  const W = 1200;
  const H = 630;

  // ใช้ตัวโลโก้เองขยายเต็มกรอบแล้วเบลอเป็นพื้นหลัง สีจะกลืนกับโลโก้พอดีไม่เห็นรอยต่อ
  const bg = await sharp(LOGO)
    .resize(W, H, { fit: "cover", position: "center" })
    .blur(38)
    .modulate({ brightness: 1.04 })
    .png()
    .toBuffer();

  const logo = await sharp(LOGO)
    .resize({ width: Math.round(W * 0.86), fit: "inside", kernel: "lanczos3" })
    .png()
    .toBuffer();
  const meta = await sharp(logo).metadata();

  await sharp(bg)
    .composite([
      {
        input: logo,
        left: Math.round((W - meta.width) / 2),
        top: Math.round((H - meta.height) / 2),
      },
    ])
    .png()
    .toFile(outFile);

  return { og: `${W}x${H}`, logoW: meta.width, logoH: meta.height };
}

const cat = await cutoutCat();
const results = [
  await render(cat, 512, path.join(APP_DIR, "icon.png")),
  await render(cat, 180, path.join(APP_DIR, "apple-icon.png")),
  await renderOgImage(path.join(APP_DIR, "opengraph-image.png")),
];
console.log(JSON.stringify(results));
