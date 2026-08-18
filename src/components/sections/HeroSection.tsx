"use client";

export default function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden bg-dark-grey pt-20 hero-section">
      <video
        className="block aspect-auto h-auto w-full"
        src="/Banner_Video.mp4"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => window.dispatchEvent(new Event("hero-video-ready"))}
      />
    </section>
  );
}
