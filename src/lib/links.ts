/** Shared attributes for outbound links. */
export function externalRel(
  href: string | undefined | null,
): { target: "_blank"; rel: "noopener noreferrer" } | Record<string, never> {
  if (!href) return {};
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}

export function isExternalHref(href: string | undefined | null): boolean {
  if (!href) return false;
  return href.startsWith("http://") || href.startsWith("https://");
}
