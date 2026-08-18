import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TypewriterWord from "@/components/sections/TypewriterWord";
import MatrixRain from "@/components/ui/MatrixRain";
import HoverFlipText from "@/components/ui/HoverFlipText";
import content from "@/content/notFound.json";

export default function NotFound() {
  return (
    <section className="hero-section relative flex min-h-screen items-center overflow-hidden bg-dark-grey py-32">
      <MatrixRain className="opacity-[0.35]" />
      <div className="absolute z-[1] hero-glow" />
      <div className="scanlines z-[1]" />

      <div className="relative z-10 mx-auto w-full px-6 text-center md:px-12 lg:px-20">
        <h3
          data-text={content.eyebrow}
          className="glitch-hover mb-6 block text-sm uppercase tracking-[0.3em] text-bt-red"
        >
          {content.eyebrow}
        </h3>

        <h1
          data-text={content.code}
          className="glitch-ambient bebas mx-auto block text-[clamp(6rem,22vw,14rem)] leading-none text-white"
        >
          {content.code}
        </h1>

        <h2 className="bebas mx-auto mt-6 max-w-3xl text-3xl uppercase text-white sm:text-4xl md:text-5xl">
          {content.heading.line1}{" "}
          <span className="text-bt-red">{content.heading.highlight}</span>
        </h2>

        <p className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-sm uppercase tracking-[0.15em] text-light-grey">
          Status: <TypewriterWord words={content.statusWords} />
        </p>

        <p className="mx-auto mt-8 max-w-xl text-light-grey">
          {content.paragraph}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-brand border border-bt-red bg-bt-red text-white"
          >
            <HoverFlipText text={content.primaryButton} />
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/case-studies"
            className="btn-brand bg-bt-red text-white"
          >
            <HoverFlipText text={content.secondaryButton} />
          </Link>
        </div>
      </div>
    </section>
  );
}
