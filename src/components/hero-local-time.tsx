"use client";

import { useEffect, useState } from "react";

export function HeroLocalTime({ timeZone = "Asia/Karachi" }: { timeZone?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    format();
    const id = window.setInterval(format, 60_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span className="hidden font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint sm:inline">
      {time ? `${time} · GMT+5` : "Islamabad · GMT+5"}
    </span>
  );
}
