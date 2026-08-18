"use client";

import { useBookCallModal } from "@/components/ui/BookCallModal";
import HoverFlipText from "@/components/ui/HoverFlipText";
import content from "@/content/caseStudiesCTA.json";

export default function CaseStudiesCTA() {
  const { open: openBookCallModal } = useBookCallModal();

  return (
    <button
      type="button"
      onClick={openBookCallModal}
      className="btn-brand bg-bt-red text-white"
    >
      <HoverFlipText text={content.buttonLabel} />
    </button>
  );
}
