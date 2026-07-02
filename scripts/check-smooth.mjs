/** Verify Lenis boots and full-page scrolling works without console errors. */
import puppeteer from "puppeteer-core";

const b = await puppeteer.launch({ channel: "chrome", headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(String(e)));
p.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:3100/", { waitUntil: "networkidle0" });

await new Promise((r) => setTimeout(r, 800));
const lenisActive = await p.evaluate(() => document.documentElement.classList.contains("lenis"));

// Wheel through the whole page to exercise the pinned sections.
const total = await p.evaluate(() => document.body.scrollHeight);
for (let i = 0; i < 40; i++) {
  await p.mouse.wheel({ deltaY: total / 40 });
  await new Promise((r) => setTimeout(r, 80));
}
await new Promise((r) => setTimeout(r, 1200));
const finalY = await p.evaluate(() => window.scrollY);

console.log(JSON.stringify({ lenisActive, totalHeight: total, finalY, errors }, null, 2));
await b.close();
