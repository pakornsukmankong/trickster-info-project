/**
 * เซิร์ฟเวอร์เล็ก ๆ รับรายการ URL รูปจากหน้าเว็บ Facebook แล้วเขียนลงไฟล์
 *
 *   node url-sink.mjs <outDir> [port]
 *
 * ทำไมต้องมี: หน้า Facebook ยิง fetch ตรงมาที่ localhost ไม่ได้ (ติด CSP connect-src)
 * และ Chrome บล็อกดาวน์โหลดอัตโนมัติหลายไฟล์ติดกัน จึงใช้วิธี
 *   FB tab -> window.open('/receiver?name=xxx') -> postMessage(payload) -> receiver POST /save
 * postMessage ไม่ถูก CSP ควบคุม เลยผ่านได้
 */
import http from "node:http";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = process.argv[2];
const PORT = Number(process.argv[3] ?? 8787);
await mkdir(OUT, { recursive: true });

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

const RECEIVER = `<!doctype html><meta charset="utf-8"><title>url-sink receiver</title>
<body style="font:14px system-ui;padding:24px">
<p id="s">waiting for payload…</p>
<script>
const name = new URLSearchParams(location.search).get('name') || 'unnamed';
addEventListener('message', async (e) => {
  if (typeof e.data !== 'string' || !e.data.length) return;
  const r = await fetch('/save?name=' + encodeURIComponent(name), { method: 'POST', body: e.data });
  document.getElementById('s').textContent = 'saved ' + (await r.text()) + ' urls as ' + name;
  document.title = 'SAVED ' + name;
});
</script>`;

http
  .createServer(async (req, res) => {
    if (req.method === "OPTIONS") {
      res.writeHead(204, cors).end();
      return;
    }
    const url = new URL(req.url, "http://localhost");

    if (url.pathname === "/receiver") {
      res.writeHead(200, { ...cors, "content-type": "text/html; charset=utf-8" }).end(RECEIVER);
      return;
    }

    if (req.method === "POST" && url.pathname === "/save") {
      const name = (url.searchParams.get("name") || "unnamed").replace(/[^a-z0-9._-]/gi, "");
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const body = Buffer.concat(chunks).toString("utf8");
      await writeFile(path.join(OUT, `${name}.txt`), body, "utf8");
      const lines = body.split("\n").filter((l) => l.trim()).length;
      console.log(`${name}: ${lines} urls`);
      res.writeHead(200, { ...cors, "content-type": "text/plain" }).end(String(lines));
      return;
    }

    res.writeHead(404, cors).end("nope");
  })
  .listen(PORT, () => console.log(`url-sink on http://localhost:${PORT} -> ${OUT}`));
