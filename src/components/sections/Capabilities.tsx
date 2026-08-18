"use client";

import { useLayoutEffect, useRef } from "react";
import {
  Palette,
  Megaphone,
  Microscope,
  Camera,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import content from "@/content/capabilities.json";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, LucideIcon> = {
  Palette,
  Megaphone,
  Microscope,
  Camera,
  Cpu,
};

// Sprocket-hole strip tiled along the filmstrip's top/bottom edge —
// a small rounded-rect "hole" repeated via an inline SVG data URI.
const PERFORATION_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='18'%3E%3Crect x='8' y='4' width='12' height='10' rx='3' fill='%23333333'/%3E%3C/svg%3E\")";

function FilmPerforation() {
  return (
    <div
      aria-hidden="true"
      className="h-[18px] w-full shrink-0 bg-dark-grey"
      style={{ backgroundImage: PERFORATION_BG, backgroundRepeat: "repeat-x" }}
    />
  );
}

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(min-width: 1024px)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const getDistance = () =>
        track.scrollWidth - (track.parentElement?.clientWidth ?? track.clientWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance() * 1.8}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="overflow-hidden bg-off-grey py-24 lg:py-32">
      <div className="mx-auto mb-10 w-full px-6 md:px-12 lg:mb-16 lg:px-20">
        <p
          data-text={content.eyebrow}
          className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
        >
          {content.eyebrow}
        </p>

        <Reveal>
          <h2 className="bebas mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white">
            {content.heading.line1}
            <span className="block text-bt-red">
              {content.heading.highlight}
            </span>
          </h2>
        </Reveal>

        <p className="max-w-2xl text-light-grey">{content.intro}</p>
      </div>

      <div
        ref={sectionRef}
        className="relative flex items-center overflow-hidden lg:h-screen"
      >
        <div className="w-full shrink-0">
          <FilmPerforation />

          <div className="overflow-x-auto lg:overflow-visible">
            <div
              ref={trackRef}
              className="flex w-max snap-x snap-mandatory gap-6 bg-grey-2 px-6 py-8 will-change-transform md:px-12 lg:snap-none lg:px-20"
            >
              {content.items.map((item, index) => {
                const Icon = ICONS[item.icon] ?? Palette;

                return (
                  <div
                    key={item.title}
                    className="flex h-[620px] w-[86vw] max-w-[600px] shrink-0 snap-start flex-col rounded-2xl border bg-grey-3 p-8 shadow-[0_24px_60px_rgba(0,0,0,0.55)] lg:h-[640px]"
                    style={{ borderColor: `${item.accent}40` }}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <Icon
                        size={40}
                        strokeWidth={1.25}
                        style={{ color: item.accent }}
                      />
                      <span className="bebas text-sm text-grey-1">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="bebas mb-4 text-3xl uppercase text-white sm:text-4xl">
                      {item.title}
                    </h3>

                    <p className="mb-6 leading-relaxed text-light-grey">
                      {item.description}
                    </p>

                    <div className="grid auto-rows-min gap-3 sm:grid-cols-2">
                      {item.items.map((service) => (
                        <div
                          key={service}
                          className="flex items-center gap-3 border border-grey-1 bg-dark-grey px-4 py-2.5 text-sm text-white"
                        >
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: item.accent }}
                          />
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <FilmPerforation />
        </div>
      </div>
    </section>
  );
}
