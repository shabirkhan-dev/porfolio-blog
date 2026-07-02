/**
 * Headless verification of the Engine Room pinned deck.
 * Checks that the sticky container actually pins while scrolling through the
 * runway, that the active layer swaps, and that the x-ray scan progresses.
 *
 * Usage: bun scripts/verify-engine-room.mjs [url]
 */
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:3111/";

const browser = await puppeteer.launch({
  channel: "chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60_000 });

  const deck = await page.evaluate(() => {
    const runway = document.querySelector("#engine-room .hidden.lg\\:block");
    if (!runway) return null;
    const rect = runway.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      height: rect.height,
      viewport: window.innerHeight,
    };
  });

  if (!deck) {
    console.error("FAIL: could not find the deck runway element");
    process.exit(1);
  }
  console.log(
    `runway: top=${Math.round(deck.top)}px height=${Math.round(deck.height)}px (${(deck.height / deck.viewport).toFixed(1)} viewports)`,
  );

  // Sample several scroll positions inside the runway.
  const samples = [0.15, 0.4, 0.65, 0.9];
  const results = [];
  for (const t of samples) {
    const y = deck.top + (deck.height - deck.viewport) * t;
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await new Promise((r) => setTimeout(r, 600));

    results.push(
      await page.evaluate(() => {
        const sticky = document.querySelector(
          "#engine-room .hidden.lg\\:block > .sticky",
        );
        const rect = sticky.getBoundingClientRect();
        const readout = document.querySelector(
          "#engine-room .hidden.lg\\:block .tabular-nums",
        );
        // x-ray skeleton overlay clip
        const skeleton = document.querySelector(
          "#engine-room .hidden.lg\\:block [style*='clip-path']",
        );
        const panelTitle = document.querySelector(
          "#engine-room .hidden.lg\\:block h3",
        );
        return {
          stickyTop: Math.round(rect.top),
          stickyVisible: rect.top < 5 && rect.bottom > window.innerHeight - 5,
          counter: readout?.textContent?.trim().replace(/\s+/g, " "),
          clip: skeleton?.style.clipPath ?? "none",
          layer: panelTitle?.textContent,
        };
      }),
    );
  }

  let ok = true;
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    console.log(
      `scroll ${samples[i] * 100}%: stickyTop=${r.stickyTop} pinned=${r.stickyVisible} layer="${r.layer}" counter="${r.counter}" clip=${r.clip}`,
    );
    if (!r.stickyVisible) ok = false;
  }

  // The active layer must change across the runway.
  const layers = new Set(results.map((r) => r.layer));
  if (layers.size < 3) {
    console.error(`FAIL: layer panel did not swap enough (saw: ${[...layers].join(", ")})`);
    ok = false;
  }
  // The scan clip must progress.
  const clips = new Set(results.map((r) => r.clip));
  if (clips.size < 3) {
    console.error("FAIL: x-ray scan clip-path did not progress");
    ok = false;
  }

  // After the runway: the next section should follow immediately (no dead gap).
  await page.evaluate((y) => window.scrollTo(0, y), deck.top + deck.height + 50);
  await new Promise((r) => setTimeout(r, 400));
  const afterGap = await page.evaluate(() => {
    const work = document.querySelector("#work");
    return work ? Math.round(work.getBoundingClientRect().top) : null;
  });
  console.log(`50px past runway end, #work top=${afterGap}px from viewport top`);

  console.log(ok ? "PASS: pinned deck behaves correctly" : "FAIL");
  process.exit(ok ? 0 : 1);
} finally {
  await browser.close();
}
