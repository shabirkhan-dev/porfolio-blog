import { ArrowRight } from "lucide-react";
import { Corners } from "@/components/corners";
import { Button } from "@/components/ui/button";

export function NewsletterBlock() {
  return (
    <section className="relative">
      <Corners />
      <div className="relative overflow-hidden rounded-lg border border-border bg-background-2 px-[clamp(1.5rem,1rem+3vw,4rem)] py-[clamp(2.5rem,2rem+3vw,4rem)]">
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-60" />
      <div className="relative grid gap-10 lg:grid-cols-[1fr_400px] lg:items-end">
        <div>
          <span className="eyebrow">Dispatches</span>
          <h2 className="t-h2 mt-6 max-w-2xl">
            Thoughtful notes on software, interfaces, and{" "}
            <span className="text-accent">product systems.</span>
          </h2>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row" action="#">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            className="h-12 min-w-0 flex-1 rounded-md border border-border-strong bg-background px-5 font-mono text-sm text-foreground placeholder:text-faint outline-none transition focus:border-accent"
          />
          <Button type="submit" variant="primary" size="lg" className="shrink-0">
            Subscribe
            <ArrowRight aria-hidden="true" size={16} />
          </Button>
        </form>
      </div>
      </div>
    </section>
  );
}
