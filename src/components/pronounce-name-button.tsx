"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type PronounceNameButtonProps = {
  name: string;
  /** Spoken form if it should differ from the displayed name. */
  pronounceAs?: string;
  className?: string;
};

/** Speaks the given name via the Web Speech API (pronunciation cue). */
export function PronounceNameButton({
  name,
  pronounceAs = "Shabir Khan",
  className,
}: PronounceNameButtonProps) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const spoken = pronounceAs || name;

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    return () => window.speechSynthesis.cancel();
  }, []);

  if (!supported) return null;

  const toggle = () => {
    const synth = window.speechSynthesis;
    if (speaking || synth.speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(spoken);
    utterance.lang = "en-US";
    utterance.rate = 0.92;
    utterance.pitch = 1;

    const voices = synth.getVoices();
    const voice =
      voices.find((v) => /en[-_]US/i.test(v.lang) && /google|samantha|aria|natural/i.test(v.name)) ??
      voices.find((v) => /en[-_]US/i.test(v.lang)) ??
      voices.find((v) => /^en/i.test(v.lang));
    if (voice) utterance.voice = voice;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={speaking ? "Stop pronunciation" : `Pronounce ${spoken}`}
      title={`Pronounce “${spoken}”`}
      className={cn(
        "grid size-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors duration-300 hover:border-border-strong hover:text-foreground",
        speaking && "border-accent text-accent",
        className,
      )}
    >
      {speaking ? (
        <VolumeX aria-hidden="true" size={15} />
      ) : (
        <Volume2 aria-hidden="true" size={15} />
      )}
    </button>
  );
}
