"use client";

import { useEffect, useRef, useState } from "react";

const RING_EASE = 0.12;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  useEffect(() => {
    setEnabled(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  // Lets any component request custom cursor text (e.g. a team photo
  // showing its member's designation on hover) without prop-drilling
  // through the whole tree down to this globally-mounted cursor.
  useEffect(() => {
    function handleCursorText(e: Event) {
      setCursorText((e as CustomEvent<string | null>).detail);
    }

    window.addEventListener("cursor-text", handleCursorText);
    return () => window.removeEventListener("cursor-text", handleCursorText);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotRef.current?.style.setProperty(
        "transform",
        `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      );
    };

    const tick = () => {
      ringX += (mouseX - ringX) * RING_EASE;
      ringY += (mouseY - ringY) * RING_EASE;
      const transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      ringRef.current?.style.setProperty("transform", transform);
      textRef.current?.style.setProperty("transform", transform);
      frameId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", handleMouseMove);
    frameId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ opacity: cursorText ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{ opacity: cursorText ? 0 : 1 }}
      />
      <div
        ref={textRef}
        className="custom-cursor-text"
        style={{ opacity: cursorText ? 1 : 0 }}
      >
        {cursorText}
      </div>
    </>
  );
}
