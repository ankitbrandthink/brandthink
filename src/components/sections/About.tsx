"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { useBookCallModal } from "@/components/ui/BookCallModal";
import HoverFlipText from "@/components/ui/HoverFlipText";
import content from "@/content/about.json";

const { timeline, endCard } = content;

// Fallback used before the track's real width is measured client-side, so the
// pin distance is roughly right even before the effect below runs.
const FALLBACK_MAX_TRANSLATE = 4300;

// Scroll distance (px), once the section is pinned, spent sliding the
// timeline up over the title while the title fades out. Only after this
// completes does horizontal scroll-jacking take over.
const INTRO_PX = 450;

// How far below its resting position the timeline starts, so it reads as a
// normal (non-overlapping) layout at rest before it slides up to overlap.
const INTRO_OFFSET_PX = 380;

export default function AboutTimeline() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { open: openBookCallModal } = useBookCallModal();
  const [maxTranslate, setMaxTranslate] = useState(FALLBACK_MAX_TRANSLATE);
  // Mobile drops the alternating top/bottom zigzag — every item renders
  // year-above/box-below instead, so it stays legible on small screens.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        setMaxTranslate(
          Math.max(0, trackRef.current.scrollWidth - window.innerWidth)
        );
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const introFraction = INTRO_PX / (INTRO_PX + maxTranslate);
  const x = useTransform(
    scrollYProgress,
    [0, introFraction, 1],
    [0, 0, -maxTranslate]
  );
  const y = useTransform(
    scrollYProgress,
    [0, introFraction],
    [INTRO_OFFSET_PX, 0]
  );

  // Once the timeline has slid into focus, the title latches to hidden and
  // stays hidden — a plain scroll-linked opacity would flicker back and
  // forth near the threshold whenever Lenis's bouncy easing overshoots the
  // scroll target and settles back.
  const [titleHidden, setTitleHidden] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v >= introFraction * 0.75) {
        setTitleHidden(true);
      } else if (v <= 0.02) {
        setTitleHidden(false);
      }
    });
  }, [scrollYProgress, introFraction]);

  return (
    <section
      id="about"
      ref={outerRef}
      className="relative bg-off-grey"
      style={{ height: `calc(100vh + ${INTRO_PX}px + ${maxTranslate}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Title — the timeline slides up over this and it fades out */}
        <motion.div
          animate={{ display: titleHidden ? 'none' : 'block' }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-32 md:px-12 lg:px-20"
        >
          <Reveal className="max-w-4xl">
            <p
              data-text={content.eyebrow}
              className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
            >
              {content.eyebrow}
            </p>

            <h2 className="bebas mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white">
              {content.heading.line1}
              <span className="block text-bt-red">
                {content.heading.highlight}
              </span>
            </h2>
          </Reveal>
        </motion.div>

        {/* Timeline */}
        <motion.div
          ref={trackRef}
          style={{ x, y }}
          className="relative z-20 flex h-full pt-20 items-center"
        >
          <div className="relative flex h-[750px] shrink-0 px-20 md:pt-0">
            {/* Main line */}
            <div className="absolute left-20 right-20 top-1/2 h-px bg-grey-1" />

            {timeline.map((item) => (
              <div
                key={item.year}
                className="relative w-[640px] flex-shrink-0"
              >
                {(isMobile ? "bottom" : item.side) === "top" ? (
                  <>
                    {/* Box sits above the main line */}
                    <div className="absolute bottom-1/2 left-1/2 z-20 mb-4 -translate-x-1/2">
                      <TimelineCard item={item} />
                    </div>

                    {/* Circle, line, year sit on the other side of the main line */}
                    <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
                      <div
                        className="mt-4 h-4 w-4 rounded-full border-2"
                        style={{
                          borderColor: item.color,
                        }}
                      >
                        <div
                          className="m-auto mt-[2px] h-2 w-2 rounded-full"
                          style={{
                            background: item.color,
                          }}
                        />
                      </div>

                      <div
                        className="h-16 w-px"
                        style={{
                          background: item.color,
                        }}
                      />

                      <div
                        className="mb-2 bebas text-2xl font sm:text-3xl md:text-4xl"
                        style={{
                          color: item.color,
                        }}
                      >
                        {item.year}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Circle, line, year sit above the main line */}
                    <div className="absolute bottom-[70%] md:bottom-1/2 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
                      <div
                        className="mb-2 bebas text-2xl font sm:text-3xl md:text-4xl"
                        style={{
                          color: item.color,
                        }}
                      >
                        {item.year}
                      </div>

                      <div
                        className="h-16 w-px"
                        style={{
                          background: item.color,
                        }}
                      />

                      <div
                        className="mb-4 flex h-4 w-4 items-center justify-center rounded-full border-2"
                        style={{
                          borderColor: item.color,
                        }}
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{
                            background: item.color,
                          }}
                        />
                      </div>
                    </div>

                    {/* Box sits on the other side of the main line, below it */}
                    <div className="absolute left-1/2 bottom-[20%] md:top-1/2 z-20 mt-4 -translate-x-1/2">
                      <TimelineCard item={item} />
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* End Card */}
            <div className="relative ml-10 flex w-[320px] items-center">
              <div className="border border-bt-red bg-[#1A0000] p-6">
                <p className="mb-3 text-[10px] tracking-[0.2em] text-bt-red">
                  {endCard.eyebrow}
                </p>

                <h3 className="bebas mb-4 text-2xl text-white sm:text-3xl md:text-4xl">
                  {endCard.heading}
                </h3>

                <button
                  type="button"
                  onClick={openBookCallModal}
                  className="btn-brand w-full bg-bt-red text-white"
                >
                  <HoverFlipText text={endCard.button} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineCard({
  item,
}: {
  item: any;
}) {
  return (
    <div
      className="mx-3 flex w-[90vw] md:w-[400px] h-[370px] md:h-[360px] flex-col border border-grey-1 bg-grey-2"
      style={{
        borderColor:
          item.year === "2026"
            ? "rgba(232,0,14,.3)"
            : undefined,
        background:
          item.year === "2026"
            ? "#1A0000"
            : undefined,
      }}
    >
      <div
        className="h-1 shrink-0"
        style={{
          background: item.color,
        }}
      />

      <div className="flex flex-1 flex-col overflow-hidden p-4 md:p-5">
        <p
          className="mb-2 shrink-0 text-[10px] tracking-[0.2em]"
          style={{
            color: item.color,
          }}
        >
          {item.tag}
        </p>

        <h3 className="bebas mb-2 shrink-0 text-2xl text-white sm:text-3xl md:text-4xl">
          {item.title}
        </h3>

        <p className="mb-3 text-xs leading-relaxed text-light-grey sm:text-sm">
          {item.body}
        </p>

        {item.stats.length > 0 && (
          <div className="mt-3 space-y-1 md:mt-auto">
            {item.stats.map((stat: string) => (
              <div
                key={stat}
                className="flex items-center gap-2 bg-black/20 px-2.5 py-1"
              >
                <span
                  className="h-1 w-1 shrink-0 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                <span className="mono text-[10px] tracking-wide text-light-grey sm:text-xs">
                  {stat}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}