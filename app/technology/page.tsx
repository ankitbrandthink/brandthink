import type { Metadata } from "next";
import CaseStudiesCTA from "@/components/sections/CaseStudiesCTA";
import TechnologyShowcase from "@/components/sections/TechnologyShowcase";
import MouseTrackingRadar from "@/components/ui/MouseTrackingRadar";
import content from "@/content/technologyPage.json";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Sentinel — BrandThink's proprietary narrative and reputation intelligence engine. Sentiment, press intelligence, crisis alerting, and AI-drafted counter-narratives.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "Technology | BrandThink",
    description:
      "Sentinel — BrandThink's proprietary narrative and reputation intelligence engine. Sentiment, press intelligence, crisis alerting, and AI-drafted counter-narratives.",
    url: "/technology",
  },
};

export default function TechnologyPage() {
  return (
    <>
      <section className="bg-dark-grey pb-12 pt-40">
        <div className="mx-auto grid items-center gap-12 px-6 md:px-12 lg:grid-cols-2 lg:px-20">
          <div>
            <p
              data-text={content.eyebrow}
              className="glitch-hover mb-4 text-sm uppercase tracking-[0.3em] text-bt-red"
            >
              {content.eyebrow}
            </p>

            <h1 className="bebas mb-8 max-w-3xl text-4xl uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {content.heading.line1}
              <span className="block text-bt-red">
                {content.heading.highlight}
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-light-grey">
              {content.intro}
            </p>
          </div>

          <div className="hidden justify-center lg:flex">
            <MouseTrackingRadar className="h-56 w-56 text-bt-red xl:h-72 xl:w-72" />
          </div>
        </div>
      </section>

      <TechnologyShowcase />

      <section className="bg-off-grey py-24">
        <div className="mx-auto px-6 text-center md:px-12 lg:px-20">
          <h2 className="bebas mb-6 text-3xl uppercase text-white sm:text-4xl md:text-5xl">
            {content.cta.heading.line1}
            <span className="block text-bt-red">
              {content.cta.heading.highlight}
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-light-grey">
            {content.cta.paragraph}
          </p>

          <CaseStudiesCTA />
        </div>
      </section>
    </>
  );
}
