export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type GithubContributionData = {
  username: string;
  total: number;
  weeks: ContributionWeek[];
  months: { label: string; weekIndex: number }[];
};

type ApiDay = { date: string; count: number; level: number };

type ApiResponse = {
  total: Record<string, number>;
  contributions: ApiDay[];
};

function startOfUtcDay(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function addUtcDays(d: Date, days: number) {
  const next = new Date(d);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function toIsoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function clampLevel(level: number): ContributionDay["level"] {
  if (level <= 0) return 0;
  if (level === 1) return 1;
  if (level === 2) return 2;
  if (level === 3) return 3;
  return 4;
}

/** Build month labels aligned to week columns (GitHub-style). */
function buildMonthLabels(weeks: ContributionWeek[]) {
  const labels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, weekIndex) => {
    const first = week.days.find((d) => d.date);
    if (!first) return;
    const month = new Date(`${first.date}T00:00:00.000Z`).getUTCMonth();
    if (month === lastMonth) return;
    lastMonth = month;
    labels.push({
      label: new Date(`${first.date}T00:00:00.000Z`).toLocaleString("en-US", {
        month: "short",
        timeZone: "UTC",
      }),
      weekIndex,
    });
  });

  return labels;
}

/**
 * Fetch last ~365 days of GitHub contributions for a user.
 * Uses a public contributions mirror (no token required).
 */
export async function getGithubContributions(
  username = "shabirkhan-dev",
): Promise<GithubContributionData | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/json" },
      },
    );
    if (!res.ok) return null;

    const data = (await res.json()) as ApiResponse;
    const byDate = new Map(
      (data.contributions ?? []).map((day) => [day.date, day] as const),
    );

    const today = startOfUtcDay(new Date());
    // Align range to start on Sunday like GitHub.
    const rangeEnd = today;
    const rangeStart = addUtcDays(rangeEnd, -364);
    const alignedStart = addUtcDays(rangeStart, -rangeStart.getUTCDay());

    const weeks: ContributionWeek[] = [];
    let cursor = alignedStart;
    let total = 0;

    while (cursor <= rangeEnd) {
      const days: ContributionDay[] = [];
      for (let i = 0; i < 7; i += 1) {
        const iso = toIsoDate(cursor);
        if (cursor > rangeEnd) {
          days.push({ date: iso, count: 0, level: 0 });
        } else {
          const hit = byDate.get(iso);
          const count = hit?.count ?? 0;
          const level = clampLevel(hit?.level ?? 0);
          if (cursor >= rangeStart) total += count;
          days.push({ date: iso, count, level });
        }
        cursor = addUtcDays(cursor, 1);
      }
      weeks.push({ days });
    }

    return {
      username,
      total,
      weeks,
      months: buildMonthLabels(weeks),
    };
  } catch {
    return null;
  }
}
