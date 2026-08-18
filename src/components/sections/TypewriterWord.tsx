"use client";

import { useEffect, useState } from "react";
import content from "@/content/hero.json";

const DEFAULT_WORDS = content.typewriterWords;
const TYPING_SPEED = 90;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 1800;

export default function TypewriterWord({
  words = DEFAULT_WORDS,
}: {
  words?: string[];
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting && text === currentWord) {
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      return () => clearTimeout(pause);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setText((prev) =>
          isDeleting
            ? currentWord.slice(0, prev.length - 1)
            : currentWord.slice(0, prev.length + 1)
        );
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <span className="text-bt-red">
      {text}
      <span className="typewriter-cursor ml-4 mb-6 inline-block h-[0.8em] w-[4px] translate-y-[0.1em] bg-white align-middle" />
    </span>
  );
}
