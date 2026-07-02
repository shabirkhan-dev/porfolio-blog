import puppeteer from "puppeteer-core";

const width = Number(process.argv[2] ?? 1440);
const height = Number(process.argv[3] ?? 900);
const out = process.argv[4] ?? "engine-room-pinned.png";

const b = await puppeteer.launch({ channel: "chrome", headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width, height });
await p.goto("http://localhost:3111/", { waitUntil: "networkidle0" });
const d = await p.evaluate(() => {
  const el = document.querySelector("#engine-room .hidden.lg\\:block");
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, h: r.height, vh: window.innerHeight };
});
await p.evaluate((y) => window.scrollTo(0, y), d.top + (d.h - d.vh) * 0.45);
await new Promise((r) => setTimeout(r, 900));
await p.screenshot({ path: out });
await b.close();
console.log(`saved ${out}`);
