"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { AsciiField } from "@/components/ascii-field";
import type { ExperienceTimeline } from "@/components/experience-timeline";
import type { Testimonials } from "@/components/testimonials";

const DeferredAsciiField = dynamic(
  () =>
    import("@/components/ascii-field").then((m) => ({ default: m.AsciiField })),
  { ssr: false },
);

const DeferredExperienceTimeline = dynamic(
  () =>
    import("@/components/experience-timeline").then((m) => ({
      default: m.ExperienceTimeline,
    })),
  {
    loading: () => <div className="min-h-[22rem]" aria-hidden />,
  },
);

const DeferredTestimonials = dynamic(
  () =>
    import("@/components/testimonials").then((m) => ({
      default: m.Testimonials,
    })),
  {
    loading: () => <div className="min-h-[20rem]" aria-hidden />,
  },
);

export function HomeAsciiField(props: ComponentProps<typeof AsciiField>) {
  return <DeferredAsciiField {...props} />;
}

export function HomeExperienceTimeline(
  props: ComponentProps<typeof ExperienceTimeline>,
) {
  return <DeferredExperienceTimeline {...props} />;
}

export function HomeTestimonials(props: ComponentProps<typeof Testimonials>) {
  return <DeferredTestimonials {...props} />;
}
