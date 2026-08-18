"use client";

import { useEffect } from "react";

const DEFAULT_TITLE = "BrandThink";
const DEFAULT_ICON_HREF = "/icon.png";
const AWAY_TITLE = "Come Back, Let's Grow 🚀";
const AWAY_EMOJI = "🚀";

function emojiFavicon(emoji: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return DEFAULT_ICON_HREF;

  ctx.font = "48px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, 32, 36);
  return canvas.toDataURL("image/png");
}

function setFavicon(href: string) {
  const link =
    document.querySelector<HTMLLinkElement>("link[rel='icon']") ??
    document.head.appendChild(Object.assign(document.createElement("link"), { rel: "icon" }));
  link.href = href;
}

export default function TabVisibility() {
  useEffect(() => {
    const awayFaviconHref = emojiFavicon(AWAY_EMOJI);

    function handleVisibility() {
      if (document.hidden) {
        document.title = AWAY_TITLE;
        setFavicon(awayFaviconHref);
      } else {
        document.title = DEFAULT_TITLE;
        setFavicon(DEFAULT_ICON_HREF);
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return null;
}
