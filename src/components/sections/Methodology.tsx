"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import DecryptText from "@/components/ui/DecryptText";
import content from "@/content/methodology.json";

gsap.registerPlugin(ScrollTrigger);

const LEG_DURATION = 0.55;
const NODE_PULSE_DURATION = 0.35;

export default function Methodology() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const dot = dotRef.current;
    const nodes = nodeRefs.current.filter((n): n is HTMLDivElement => !!n);

    if (!section || !track || !dot || nodes.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return; // desktop-only, matches the lg:block connector line

    const ctx = gsap.context(() => {
      const trackRect = track.getBoundingClientRect();
      const positions = nodes.map((node) => {
        const r = node.getBoundingClientRect();
        return r.left + r.width / 2 - trackRect.left;
      });

      gsap.set(dot, { x: positions[0], opacity: 0 });

      // A pulse of "energy" travels through every step in order, lighting
      // each one up as it arrives, then loops back around to the start —
      // the loop, made visible.
      const loop = gsap.timeline({ repeat: -1, paused: true });

      loop.to(dot, { opacity: 1, duration: 0.2 });

      positions.forEach((pos, i) => {
        if (i === 0) return;
        loop
          .to(dot, { x: pos, duration: LEG_DURATION, ease: "power1.inOut" })
          .to(
            nodes[i],
            {
              scale: 1.18,
              duration: NODE_PULSE_DURATION,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            },
            "<"
          );
      });

      loop
        .to(dot, { opacity: 0, duration: 0.25 })
        .set(dot, { x: positions[0] })
        .to({}, { duration: 0.35 }); // brief hold before the next lap

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => loop.play(),
        onEnterBack: () => loop.play(),
        onLeave: () => loop.pause(),
        onLeaveBack: () => loop.pause(),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="methodology" className="bg-dark-grey py-16">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <p
          data-text={content.eyebrow}
          className="glitch-hover mb-4 text-center text-sm uppercase tracking-[0.3em] text-bt-red"
        >
          {content.eyebrow}
        </p>

        <Reveal className="mx-auto text-center">
          <h2 className="mb-8 bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white font-bold">
            {content.heading.line1}
            <DecryptText
              text={content.heading.highlight}
              className="block text-bt-red"
            />
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto text-center">
          <p className="mx-auto mb-24 max-w-2xl text-base text-light-grey sm:text-lg">
            {content.body}
          </p>
        </Reveal>

        <div ref={trackRef} className="relative">
          {/* Horizontal Line — draws in left to right when scrolled into view */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute left-14 right-14 top-7 hidden h-px bg-bt-red lg:block"
          />

          {/* Traveling pulse — loops through every step, node to node */}
          <div
            ref={dotRef}
            aria-hidden="true"
            className="absolute top-7 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_4px_rgba(232,0,14,0.7)] lg:block"
          />

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {content.steps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 0.1}
                className="relative z-10 text-center"
              >
                <div
                  ref={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                  className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full text-xl bebas text-white ${step.color}`}
                >
                  {step.number}
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mb-3 text-sm font-medium text-bt-red">
                  {step.tagline}
                </p>

                <p className="text-sm leading-relaxed text-light-grey">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
