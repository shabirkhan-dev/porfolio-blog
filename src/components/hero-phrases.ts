export const HERO_BUILD_PHRASES = [
  "web applications.",
  "mobile applications.",
  "backend systems.",
  "developer tools.",
  "production platforms.",
] as const;

export const HERO_FIRST_PHRASE = HERO_BUILD_PHRASES[0];
export const HERO_PHRASE_SLOT_CH = Math.max(
  ...HERO_BUILD_PHRASES.map((phrase) => phrase.length),
);
