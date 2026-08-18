"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STAT_PATTERN = /^([^\d\-−]*)([-−]?\d+(?:\.\d+)?)(.*)$/;

export default function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(STAT_PATTERN);
    if (!match) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace("−", "-"));
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`);

    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}
