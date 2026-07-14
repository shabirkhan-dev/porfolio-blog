"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Headphones, Pause, Play, Square } from "lucide-react";

type Status = "idle" | "playing" | "paused";

/** Split long text into speakable chunks so long articles do not get cut off. */
function toChunks(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text];
  const chunks: string[] = [];
  let buffer = "";

  for (const sentence of sentences) {
    if ((buffer + sentence).length > 220 && buffer) {
      chunks.push(buffer.trim());
      buffer = "";
    }
    buffer += sentence;
  }
  if (buffer.trim()) chunks.push(buffer.trim());

  return chunks.filter(Boolean);
}

export function ListenButton({ text }: { text: string }) {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);

  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const cancelledRef = useRef(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    const frame = window.requestAnimationFrame(() => setSupported(true));

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current =
        voices.find((v) => /en[-_]US/i.test(v.lang) && /natural|google|samantha|aria/i.test(v.name)) ??
        voices.find((v) => /en[-_]US/i.test(v.lang)) ??
        voices.find((v) => /^en/i.test(v.lang)) ??
        null;
    };

    pickVoice();
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
      window.cancelAnimationFrame(frame);
      cancelledRef.current = true;
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakFrom = useCallback(function speakChunk(from: number) {
    const synth = window.speechSynthesis;
    const chunks = chunksRef.current;

    if (from >= chunks.length) {
      setStatus("idle");
      setProgress(0);
      indexRef.current = 0;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[from]);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    if (voiceRef.current) utterance.voice = voiceRef.current;

    utterance.onend = () => {
      if (cancelledRef.current) return;
      const nextIndex = from + 1;
      indexRef.current = nextIndex;
      setProgress(nextIndex / chunks.length);
      speakChunk(nextIndex);
    };

    utterance.onerror = () => {
      if (cancelledRef.current) return;
      setStatus("idle");
      setProgress(0);
      indexRef.current = 0;
    };

    synth.speak(utterance);
  }, []);

  const start = useCallback(() => {
    const synth = window.speechSynthesis;
    synth.cancel();
    cancelledRef.current = false;

    if (chunksRef.current.length === 0) {
      chunksRef.current = toChunks(text);
    }
    indexRef.current = 0;
    setProgress(0);
    setStatus("playing");
    speakFrom(0);
  }, [speakFrom, text]);

  const toggle = useCallback(() => {
    const synth = window.speechSynthesis;

    if (status === "idle") {
      start();
      return;
    }
    if (status === "playing") {
      synth.pause();
      setStatus("paused");
      return;
    }
    synth.resume();
    setStatus("playing");
  }, [start, status]);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    window.speechSynthesis.cancel();
    setStatus("idle");
    setProgress(0);
    indexRef.current = 0;
  }, []);

  if (!supported) return null;

  const active = status !== "idle";
  const label =
    status === "playing" ? "Pause" : status === "paused" ? "Resume" : "Listen";

  return (
    <div className="inline-flex w-full max-w-sm items-center gap-3 border border-border bg-background-2 p-1.5 pr-3 sm:w-auto">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={status === "playing"}
        aria-label={`${label} article audio`}
        className="grid size-11 shrink-0 place-items-center bg-accent text-accent-foreground transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {status === "playing" ? (
          <Pause aria-hidden="true" size={14} />
        ) : (
          <Play aria-hidden="true" size={14} className="translate-x-px" />
        )}
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-foreground/80">
          <Headphones aria-hidden="true" size={12} className="text-accent" />
          {active ? `${label} · listening` : "Listen"}
        </span>
        <span
          aria-hidden="true"
          className="h-0.5 w-full overflow-hidden rounded-full bg-border"
        >
          <span
            className="block h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </span>
      </div>

      {active ? (
        <button
          type="button"
          onClick={stop}
          aria-label="Stop article audio"
          className="grid size-11 shrink-0 place-items-center rounded-sm text-faint transition-colors hover:text-accent"
        >
          <Square aria-hidden="true" size={13} />
        </button>
      ) : null}
    </div>
  );
}
