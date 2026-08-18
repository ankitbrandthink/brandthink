"use client";

import { useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import content from "@/content/careersForm.json";
import HoverFlipText from "@/components/ui/HoverFlipText";

const { fields, fullWidthFields, resumeLabel, resumeHint, messageLabel, submitLabel } =
  content;

type Status = "idle" | "sending" | "sent" | "error";

export default function CareersForm() {
  const [status, setStatus] = useState<Status>("idle");
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          role: data.get("role"),
          portfolio: data.get("portfolio"),
          resume: data.get("resume"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      router.push("/thank-you/");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-grey-1 bg-grey-2 p-8 md:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={
              fullWidthFields.includes(field.name) ? "sm:col-span-2" : ""
            }
          >
            <label
              htmlFor={field.name}
              className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
            >
              {field.label}
              {field.required && (
                <span className="text-bt-red"> *</span>
              )}
            </label>

            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              className="w-full border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
            />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label
          htmlFor="resume"
          className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
        >
          {resumeLabel}
          <span className="text-bt-red"> *</span>
        </label>

        <input
          id="resume"
          name="resume"
          type="url"
          placeholder="https://drive.google.com/..."
          required
          className="w-full border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
        />

        <p className="mt-2 text-xs text-light-grey">{resumeHint}</p>
      </div>

      <div className="mt-6">
        <label
          htmlFor="message"
          className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
        >
          {messageLabel}
        </label>

        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full resize-none border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-bt-red">
          Something went wrong submitting your application. Please try
          again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-brand mt-8 w-full bg-bt-red text-white disabled:opacity-60 sm:w-auto"
      >
        <HoverFlipText text={status === "sending" ? "Submitting…" : submitLabel} />
      </button>
    </form>
  );
}
