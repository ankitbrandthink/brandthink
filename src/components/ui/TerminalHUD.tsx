"use client";

import { useEffect, useState } from "react";

const LOG_LINES = [
  "> connecting to attention_layer...",
  "> scanning funnel for leaks...",
  "> optimizing CAC vectors...",
  "> distribution nodes: online",
  "> attribution: 100% traced",
  "> systems: nominal",
];

const TYPE_SPEED = 35;
const HOLD_DURATION = 1800;

export default function TerminalHUD() {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const currentLine = LOG_LINES[lineIndex];

    if (text.length < currentLine.length) {
      const timeout = setTimeout(
        () => setText(currentLine.slice(0, text.length + 1)),
        TYPE_SPEED
      );
      return () => clearTimeout(timeout);
    }

    const hold = setTimeout(() => {
      setText("");
      setLineIndex((i) => (i + 1) % LOG_LINES.length);
    }, HOLD_DURATION);

    return () => clearTimeout(hold);
  }, [text, lineIndex]);

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-40 hidden items-center gap-2 border border-grey-1 bg-dark-grey/90 px-4 py-2 font-mono text-[11px] text-light-grey backdrop-blur md:flex">
      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-green-500" />
      <span className="whitespace-nowrap">{text}</span>
      <span className="typewriter-cursor inline-block h-3 w-[2px] shrink-0 bg-bt-red" />
    </div>
  );
}
