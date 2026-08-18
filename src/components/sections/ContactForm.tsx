"use client";

import { useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import content from "@/content/contactForm.json";
import HoverFlipText from "@/components/ui/HoverFlipText";

const { fields, messageLabel, submitLabel } = content;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
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
            className={field.name === "company" ? "sm:col-span-2" : ""}
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
          htmlFor="message"
          className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
        >
          {messageLabel}
          <span className="text-bt-red"> *</span>
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-bt-red">
          Something went wrong sending your message. Please try again or
          email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-brand mt-8 w-full bg-bt-red text-white disabled:opacity-60 sm:w-auto"
      >
        <HoverFlipText text={status === "sending" ? "Sending…" : submitLabel} />
      </button>
    </form>
  );
}
