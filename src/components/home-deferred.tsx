"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { CaseStudyCard } from "@/components/portfolio/case-study-card";
import type { ExperienceTimeline } from "@/components/experience-timeline";
import type { Testimonials } from "@/components/testimonials";
import type { Toolkit } from "@/components/toolkit";

const DeferredToolkit = dynamic(
  () => import("@/components/toolkit").then((m) => ({ default: m.Toolkit })),
  { ssr: false, loading: () => <div className="min-h-[28rem]" aria-hidden /> },
);

const DeferredExperienceTimeline = dynamic(
  () =>
    import("@/components/experience-timeline").then((m) => ({
      default: m.ExperienceTimeline,
    })),
  { ssr: false, loading: () => <div className="min-h-[24rem]" aria-hidden /> },
);

const DeferredTestimonials = dynamic(
  () =>
    import("@/components/testimonials").then((m) => ({
      default: m.Testimonials,
    })),
  { ssr: false, loading: () => <div className="min-h-[20rem]" aria-hidden /> },
);

const DeferredCaseStudyCard = dynamic(
  () =>
    import("@/components/portfolio/case-study-card").then((m) => ({
      default: m.CaseStudyCard,
    })),
  { ssr: false },
);

export function HomeToolkit(props: ComponentProps<typeof Toolkit>) {
  return <DeferredToolkit {...props} />;
}

export function HomeExperienceTimeline(
  props: ComponentProps<typeof ExperienceTimeline>,
) {
  return <DeferredExperienceTimeline {...props} />;
}

export function HomeTestimonials(props: ComponentProps<typeof Testimonials>) {
  return <DeferredTestimonials {...props} />;
}

export function HomeCaseStudyCard(props: ComponentProps<typeof CaseStudyCard>) {
  return <DeferredCaseStudyCard {...props} />;
}
