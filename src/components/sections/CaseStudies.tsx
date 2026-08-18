"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ChevronUp, ChevronDown } from "lucide-react";
import caseStudies from "@/content/caseStudies.json";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CaseStudyVisual from "@/components/sections/CaseStudyVisual";
import HoverFlipText from "@/components/ui/HoverFlipText";
import content from "@/content/caseStudiesSection.json";

const FEATURED_SLUGS = [
  "bjp",
  "britannia",
  "fixderma",
  "yoho-footwear",
  "tally-education",
];
const featuredCaseStudies = FEATURED_SLUGS.map((slug) =>
  caseStudies.find((study) => study.slug === slug)
).filter((study): study is (typeof caseStudies)[number] => !!study);

const TILT_MAX_DEG = 8;
const VH_PER_CARD = 80;

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;
      setDistance(Math.max(0, track.scrollWidth - container.clientWidth));
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  function handleTiltMove(index: number, event: React.MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: relX * TILT_MAX_DEG,
      rotateX: -relY * TILT_MAX_DEG,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  function handleTiltLeave(index: number) {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }

  // Jumps straight to either edge of the pinned scroll-jacked range, so
  // visitors aren't forced to scroll through the whole horizontal carousel
  // to get past (or back into) this section.
  function skipToSectionEdge(edge: "start" | "end") {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const target =
      edge === "start"
        ? sectionTop
        : sectionTop + section.offsetHeight - window.innerHeight;

    window.scrollTo(0, target);
  }

  return (
    <>
      <div className="bg-off-grey px-6 pb-8 pt-24 md:px-12 lg:px-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              data-text={content.eyebrow}
              className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
            >
              {content.eyebrow}
            </p>

            <Reveal>
              <h2 className="bebas mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white">
                {content.heading.line1} <span className="text-bt-red">{content.heading.highlight}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-2xl text-lg text-light-grey">
                {content.body}
              </p>
            </Reveal>
          </div>

          <div className="shrink-0">
            <Link
              href="/case-studies"
              className="btn-brand inline-block bg-bt-red text-white"
            >
              <HoverFlipText text="See Detailed Case Studies" />
            </Link>
          </div>
        </div>
      </div>

      <section
        id="cases"
        ref={sectionRef}
        className="relative bg-off-grey"
        style={{ height: `${featuredCaseStudies.length * VH_PER_CARD}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-8">
          <div className="absolute right-6 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 md:right-12">
            <button
              type="button"
              onClick={() => skipToSectionEdge("start")}
              aria-label="Skip to before this section"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-grey-1 bg-grey-2 text-light-grey transition-colors hover:border-bt-red hover:text-white"
            >
              <ChevronUp size={18} />
            </button>

            <button
              type="button"
              onClick={() => skipToSectionEdge("end")}
              aria-label="Skip past this section"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-grey-1 bg-grey-2 text-light-grey transition-colors hover:border-bt-red hover:text-white"
            >
              <ChevronDown size={18} />
            </button>
          </div>

            <div ref={containerRef} className="overflow-hidden">
              <motion.div
                ref={trackRef}
                style={{ x }}
                className="flex w-max gap-6 px-6 md:px-12 lg:px-20"
              >
                {featuredCaseStudies.map((study, index) => (
                  <Link
                    key={study.title}
                    href={`/case-studies/${study.slug}`}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    onMouseMove={(e) => handleTiltMove(index, e)}
                    onMouseLeave={() => handleTiltLeave(index)}
                    className="glow-border scan-hover flex w-[85vw] max-w-[820px] shrink-0 flex-col border border-grey-1 bg-grey-2 transition-colors hover:border-grey-1 hover:bg-off-grey"
                  >
                    <CaseStudyVisual
                      icon={study.icon}
                      color={study.color}
                      image={study.image}
                      alt={study.title}
                      clientName={study.project.replace(/^Project /, "")}
                      compact
                    />

                    <div className="p-6 md:p-8">
                      <p
                        className="mb-2 text-xs uppercase tracking-[0.2em]"
                        style={{ color: study.color }}
                      >
                        {study.industry}
                      </p>

                      <h3
                        className="bebas mb-6 text-3xl uppercase"
                        style={{ color: study.color }}
                      >
                        {study.title}
                      </h3>

                      <div className="mb-4 border-t border-grey-1" />

                      <div className="flex flex-wrap gap-6 md:gap-8">
                        {study.stats.map((stat) => (
                          <div key={stat.label}>
                            <div
                              className="bebas text-3xl"
                              style={{ color: study.color }}
                            >
                              <AnimatedCounter value={stat.value} />
                            </div>

                            <div className="text-xs text-light-grey">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </>
    );
}
