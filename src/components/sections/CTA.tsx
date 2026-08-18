"use client";

import Link from "next/link";
import { useBookCallModal } from "@/components/ui/BookCallModal";
import Reveal from "@/components/ui/Reveal";
import DecryptText from "@/components/ui/DecryptText";
import HoverFlipText from "@/components/ui/HoverFlipText";
import content from "@/content/cta.json";

// Row/column dividers for the 1 / 2 / 4 column responsive grid below
const DIVIDER_CLASSES = [
  "",
  "border-t sm:border-t-0 sm:border-l lg:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t sm:border-l lg:border-t-0 lg:border-l",
];

export default function CTA() {
  const { open: openBookCallModal } = useBookCallModal();

  return (
    <section id="cta" className="bg-dark-grey py-32">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p
            data-text={content.eyebrow}
            className="glitch-hover mb-6 font-mono text-xs tracking-[0.2em] text-bt-red"
          >
            {content.eyebrow}
          </p>

          <h2 className="bebas mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.95] text-white">
            {content.heading.line1}{" "}
            <DecryptText
              text={content.heading.highlight}
              className="block text-bt-red"
            />
          </h2>

          <p className="mb-10 text-light-grey">
            {content.paragraph}
          </p>

          <div className="mb-20 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={openBookCallModal}
              className="btn-brand border border-grey-1 text-light-grey"
            >
              <HoverFlipText text={content.primaryButton} />
            </button>

            <Link
              href="/case-studies"
              className="btn-brand border border-grey-1 text-light-grey"
            >
              <HoverFlipText text={content.secondaryButton} />
            </Link>

            <a
              href="https://docs.google.com/presentation/d/1w60b4dGl4HkOuI3C6f9aL8-AN4uxc52VNRfQ-nigOs4/edit?slide=id.p#slide=id.p"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand bg-bt-red text-white"
            >
              <HoverFlipText text={content.tertiaryButton} />
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 border-t-2 border-grey-1 sm:grid-cols-2 lg:grid-cols-4 bg-dark-grey">
          {content.differentiators.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              className={`border-grey-1 px-6 py-8 text-center md:px-8 ${DIVIDER_CLASSES[index]}`}
            >
              <div className="mb-2 text-sm font-semibold text-white">
                {item.title}
              </div>

              <div className="text-sm text-light-grey">
                {item.description}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
