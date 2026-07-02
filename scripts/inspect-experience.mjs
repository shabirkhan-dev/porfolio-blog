import puppeteer from "puppeteer-core";

const url = process.env.SHOT_URL ?? "http://localhost:3122/";
const b = await puppeteer.launch({ channel: "chrome", headless: "new", args: ["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(url, { waitUntil: "networkidle0" });
await p.waitForSelector("section[style*='height']", { timeout: 15000 });

const d = await p.evaluate(() => {
  const el = document.querySelector("section[style*='height']");
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, h: r.height, vh: window.innerHeight };
});
// dock on panel 2 (2023)
await p.evaluate((y) => window.scrollTo(0, y), d.top + (d.h - d.vh) * 0.4);
await new Promise((r) => setTimeout(r, 1500));

const report = await p.evaluate(() => {
  // probe the metric tile area (right column) and the period line (left)
  const probes = [
    [750, 350], // metrics grid area
    [400, 408], // period meta line
  ];
  return probes.map(([x, y]) => {
    const stack = document.elementsFromPoint(x, y).slice(0, 6).map((el) => {
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        cls: (el.getAttribute("class") || "").slice(0, 90),
        bg: cs.backgroundColor,
        stroke: cs.webkitTextStrokeWidth,
        color: cs.color,
        opacity: cs.opacity,
      };
    });
    return { x, y, stack };
  });
});
console.log(JSON.stringify(report, null, 2));
await b.close();
