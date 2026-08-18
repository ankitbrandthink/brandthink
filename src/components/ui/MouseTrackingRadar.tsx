"use client";

import { useEffect, useRef, useState } from "react";
import { SatelliteDish } from "lucide-react";

// The dish artwork itself points toward the upper-right at 0deg rotation;
// this re-zeroes it so rotation 0 reads as "pointing right" before we add
// the angle to the cursor.
const BASE_ANGLE_OFFSET = -45;

export default function MouseTrackingRadar({
  className,
}: {
  className?: string;
}) {
  const iconRef = useRef<SVGSVGElement>(null);
  const [angle, setAngle] = useState(BASE_ANGLE_OFFSET);
  const lastAngleRef = useRef(BASE_ANGLE_OFFSET);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleMove(event: MouseEvent) {
      const el = iconRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;

      const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI + BASE_ANGLE_OFFSET;

      // atan2 wraps at ±180deg, which would otherwise make the CSS
      // transition spin the icon a full turn the instant the cursor
      // crosses that boundary. Instead, nudge the raw angle to whichever
      // equivalent (±360deg) is closest to the last angle, so it always
      // takes the short way round.
      const prev = lastAngleRef.current;
      const delta = (((rawAngle - prev + 180) % 360) + 360) % 360 - 180;
      const nextAngle = prev + delta;

      lastAngleRef.current = nextAngle;
      setAngle(nextAngle);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <SatelliteDish
      ref={iconRef}
      className={className}
      style={{
        transform: `rotate(${angle + 90}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    />
  );
}
