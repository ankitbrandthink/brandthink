"use client";

import { useLayoutEffect, useRef } from "react";
import {
  MessageSquareText,
  Newspaper,
  Radar,
  Target,
  BellRing,
  FileBarChart,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import content from "@/content/technologyPage.json";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, LucideIcon> = {
  MessageSquareText,
  Newspaper,
  Radar,
  Target,
  BellRing,
  FileBarChart,
};

export default function TechnologyShowcase() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const liveDotRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c);
    if (!grid || cards.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      gsap.set(cards, { clearProps: "all" });
      barRefs.current.forEach((bar, i) => {
        if (bar) gsap.set(bar, { width: `${content.pillars[i].barPercent}%` });
      });
      return;
    }

    if (liveDotRef.current) {
      gsap.to(liveDotRef.current, {
        opacity: 0.25,
        scale: 0.85,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          clipPath: "inset(0% 100% 0% 0%)",
          y: 40,
          transformPerspective: 900,
        });

        const bar = barRefs.current[i];
        if (bar) gsap.set(bar, { width: "0%" });

        gsap.to(card, {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 0.9,
          delay: (i % 3) * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
          onComplete: () => {
            if (bar) {
              gsap.to(bar, {
                width: `${content.pillars[i].barPercent}%`,
                duration: 0.8,
                ease: "power2.out",
              });
            }
          },
        });
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Dashboard window */}
      <section className="border-t border-grey-1 bg-off-grey py-24 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-bt-red">
              {content.product.eyebrow}
            </p>

            <h2 className="bebas mb-10 text-4xl uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {content.product.name}
              <span className="block text-bt-red">
                {content.product.tagline}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden border border-grey-1 bg-dark-grey">
              {/* Window chrome */}
              <div className="flex items-center gap-3 border-b border-grey-1 px-6 py-4">
                <div className="h-3 w-3 rounded-full bg-bt-red" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />

                <span className="ml-3 text-xs font-medium tracking-[0.2em] text-light-grey">
                  {content.product.dashboardLabel}
                </span>

                <span className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-green-500">
                  <span ref={liveDotRef} className="h-2 w-2 rounded-full bg-green-500" />
                  Live
                </span>
              </div>

              {/* Metrics */}
              <div className="grid gap-6 p-6 sm:grid-cols-3 md:p-8">
                {content.product.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="scan-hover border-l-4 border-bt-red bg-off-grey p-6"
                  >
                    <p className="mb-2 text-xs tracking-[0.15em] text-light-grey">
                      {stat.label}
                    </p>
                    <h3 className="bebas text-4xl text-white sm:text-5xl">
                      <AnimatedCounter value={stat.value} />
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capability panels */}
      <section className="bg-dark-grey py-24 lg:py-32">
        <div className="mx-auto px-6 md:px-12 lg:px-20">
          <div
            ref={gridRef}
            className="grid gap-px overflow-hidden bg-grey-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {content.pillars.map((pillar, index) => {
              const Icon = ICONS[pillar.icon] ?? MessageSquareText;

              return (
                <div
                  key={pillar.title}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="bg-grey-2 p-6 md:p-8"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      style={{ color: pillar.accent }}
                    />
                    <span className="bebas text-sm text-grey-1">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="bebas mb-4 text-3xl uppercase leading-none text-white sm:text-4xl">
                    {pillar.title}
                  </div>

                  <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-dark-grey">
                    <div
                      ref={(el) => {
                        barRefs.current[index] = el;
                      }}
                      className="h-full rounded-full"
                      style={{ background: pillar.accent }}
                    />
                  </div>

                  <h3 className="mb-4 text-base font-semibold leading-snug text-white">
                    {pillar.headline}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-grey-1 bg-dark-grey px-2.5 py-1 text-[11px] text-light-grey"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ORM platform */}
      <section className="border-t border-grey-1 bg-dark-grey pb-12 pt-24 lg:pt-32">
        <div className="mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-bt-red">
              {content.ormProduct.eyebrow}
            </p>

            <h2 className="bebas mb-8 text-4xl uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {content.ormProduct.heading.line1}
              <span className="block text-bt-red">
                {content.ormProduct.heading.highlight}
              </span>
            </h2>

            <p className="mb-12 max-w-2xl text-base text-light-grey sm:text-lg">
              {content.ormProduct.brief}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {content.ormProduct.features.map((feature) => (
                <li
                  key={feature}
                  className="scan-hover flex items-start gap-3 border border-grey-1 bg-grey-2 p-4 text-sm text-light-grey"
                >
                  <span className="mt-0.5 text-bt-red">▹</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
