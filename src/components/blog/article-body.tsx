"use client";

import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Quote } from "lucide-react";
import { slugifyHeading } from "@/data/site";

function parseCodeMeta(meta?: string) {
  if (!meta) return { language: "text", filename: undefined as string | undefined };
  const parts = meta.trim().split(/\s+/);
  return {
    language: parts[0] ?? "text",
    filename: parts[1],
  };
}

function Callout({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="my-10 overflow-hidden rounded-xl border border-accent/25 bg-accent/[0.06] p-6">
      {label ? (
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent">
          {label}
        </p>
      ) : null}
      <div className="mt-3 text-[1.02rem] leading-7 text-foreground/90 [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}

function CodeBlock({
  language,
  filename,
  code,
}: {
  language: string;
  filename?: string;
  code: string;
}) {
  return (
    <div className="code-surface my-10 overflow-hidden rounded-xl border border-border">
      <div className="code-header flex items-center justify-between border-b px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.14em]">
        <span className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-accent/60" />
          </span>
          {filename ?? "snippet"}
        </span>
        <span className="code-accent">{language}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-7">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function createMarkdownComponents(): Components {
  let paragraphIndex = 0;

  return {
    h2: ({ children }) => {
      const text = String(children);
      return (
        <h2
          id={slugifyHeading(text)}
          className="t-h3 scroll-mt-28 pt-8 !text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)]"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="pt-4 font-display text-xl font-semibold tracking-tight text-foreground">
        {children}
      </h3>
    ),
    p: ({ children, node }) => {
      const index = paragraphIndex++;
      const isFirst = index === 0;
      const isLead =
        node?.children?.[0]?.type === "text" &&
        typeof node.children[0].value === "string" &&
        node.children[0].value.startsWith("::lead ");

      if (isLead && node?.children?.[0]?.type === "text") {
        const leadText = (node.children[0].value as string).replace(/^::lead\s+/, "");
        return (
          <p className="text-[clamp(1.2rem,1rem+0.8vw,1.5rem)] leading-[1.6] text-foreground/90">
            {leadText}
          </p>
        );
      }

      return (
        <p
          className={
            isFirst
              ? "text-[1.05rem] leading-8 text-muted-foreground first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.4rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-accent"
              : "text-[1.05rem] leading-8 text-muted-foreground"
          }
        >
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => {
      const childArray = Array.isArray(children) ? children : [children];
      const first = childArray[0];

      if (
        first &&
        typeof first === "object" &&
        "props" in first &&
        first.props?.className?.includes("callout")
      ) {
        return <>{children}</>;
      }

      return (
        <figure className="my-12 border-l-2 border-accent pl-6">
          <Quote aria-hidden="true" size={22} className="mb-4 text-accent" />
          <blockquote className="font-serif text-[clamp(1.5rem,1.2rem+1.3vw,2.2rem)] italic leading-snug text-foreground [&>p]:m-0">
            {children}
          </blockquote>
        </figure>
      );
    },
    ul: ({ children }) => (
      <ul className="space-y-3 [&>li]:flex [&>li]:gap-4 [&>li]:text-[1.02rem] [&>li]:leading-7 [&>li]:text-muted-foreground [&>li]:before:mt-2.5 [&>li]:before:size-1.5 [&>li]:before:shrink-0 [&>li]:before:rounded-full [&>li]:before:bg-accent [&>li]:before:content-['']">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-none space-y-3 [counter-reset:item] [&>li]:flex [&>li]:gap-4 [&>li]:text-[1.02rem] [&>li]:leading-7 [&>li]:text-muted-foreground [&>li]:before:mt-0.5 [&>li]:before:min-w-[1.5rem] [&>li]:before:font-mono [&>li]:before:text-sm [&>li]:before:text-accent [&>li]:before:content-[counter(item,decimal-leading-zero)] [&>li]:before:[counter-increment:item]">
        {children}
      </ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    hr: () => (
      <div
        className="my-12 flex items-center justify-center gap-2"
        aria-hidden="true"
      >
        <span className="size-1 rounded-full bg-faint/50" />
        <span className="size-1 rounded-full bg-accent" />
        <span className="size-1 rounded-full bg-faint/50" />
      </div>
    ),
    code: ({ className, children }) => {
      const isBlock = Boolean(className);
      if (!isBlock) {
        return (
          <code className="rounded bg-background-2 px-1.5 py-0.5 font-mono text-[0.9em] text-accent">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => {
      const child = Array.isArray(children) ? children[0] : children;
      if (!child || typeof child !== "object" || !("props" in child)) {
        return <pre>{children}</pre>;
      }

      const className = child.props.className as string | undefined;
      const language = className?.replace("language-", "") ?? "text";
      const { language: parsedLanguage, filename } = parseCodeMeta(language);
      const code = String(child.props.children ?? "").replace(/\n$/, "");

      return (
        <CodeBlock
          language={parsedLanguage}
          filename={filename}
          code={code}
        />
      );
    },
  };
}

function transformCallouts(markdown: string) {
  return markdown.replace(
    /^>\s*\[!(\w+)\]\s*(.*)$/gim,
    (_, label: string, rest: string) => `> **${label}** ${rest}`.trim(),
  );
}

function renderAlertBlockquote(children: React.ReactNode) {
  const text = String(children)
    .replace(/\[!(.*?)\]/, "")
    .trim();
  const labelMatch = String(children).match(/\[!(\w+)\]/);
  const label = labelMatch?.[1];

  return <Callout label={label}>{text}</Callout>;
}

export function ArticleBody({ markdown }: { markdown: string }) {
  const components = createMarkdownComponents();

  const enhancedComponents: Components = {
    ...components,
    blockquote: ({ children }) => {
      const raw = String(children);
      if (raw.includes("[!")) {
        return renderAlertBlockquote(children);
      }

      return (
        <figure className="my-12 border-l-2 border-accent pl-6">
          <Quote aria-hidden="true" size={22} className="mb-4 text-accent" />
          <blockquote className="font-serif text-[clamp(1.5rem,1.2rem+1.3vw,2.2rem)] italic leading-snug text-foreground [&>p]:m-0">
            {children}
          </blockquote>
        </figure>
      );
    },
  };

  return (
    <div className="space-y-7">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={enhancedComponents}
      >
        {transformCallouts(markdown)}
      </ReactMarkdown>
    </div>
  );
}
