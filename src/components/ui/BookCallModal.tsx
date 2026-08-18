"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type SyntheticEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";
import HoverFlipText from "@/components/ui/HoverFlipText";
import {
  EMAILJS_CONFIGURED,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_CONTACT,
  submittedAt,
} from "@/lib/emailjs";

const BookCallModalContext = createContext<{ open: () => void } | null>(
  null
);

export function useBookCallModal() {
  const ctx = useContext(BookCallModalContext);
  if (!ctx) {
    throw new Error(
      "useBookCallModal must be used within BookCallModalProvider"
    );
  }
  return ctx;
}

const timeSlots = [
  "Morning (9am–12pm)",
  "Afternoon (12pm–4pm)",
  "Evening (4pm–7pm)",
];

type Status = "idle" | "sending" | "sent" | "error";

export function BookCallModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    setStatus("idle");
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!EMAILJS_CONFIGURED || !EMAILJS_TEMPLATE_CONTACT) {
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const preferredTime = data.get("preferredTime");

    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_CONTACT,
        {
          form_source: "Book a Strategy Call",
          from_name: data.get("name"),
          from_email: data.get("email"),
          company: data.get("company"),
          preferred_time: preferredTime || "Not specified",
          message: `Requested a strategy call. Preferred time: ${preferredTime || "not specified"}.`,
          submitted_at: submittedAt(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <BookCallModalContext.Provider
      value={{ open: () => setIsOpen(true) }}
    >
      {children}

      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-call-heading"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-grey-1 bg-grey-2 p-8 md:p-10"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-6 top-6 text-light-grey transition-colors hover:text-white"
            >
              <X size={20} />
            </button>

            {status === "sent" ? (
              <>
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bt-red">
                  Book A Strategy Call
                </p>

                <h2 className="bebas mb-4 text-3xl uppercase text-white sm:text-4xl">
                  Request Sent.
                </h2>

                <p className="text-sm text-light-grey">
                  Thanks — we'll reach out shortly to confirm a time.
                </p>
              </>
            ) : (
              <>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bt-red">
              Book A Strategy Call
            </p>

            <h2
              id="book-call-heading"
              className="bebas mb-4 text-3xl uppercase text-white sm:text-4xl"
            >
              Let's Talk
              <span className="block text-bt-red">Growth.</span>
            </h2>

            <p className="mb-8 text-sm text-light-grey">
              30 minutes, no pitch. Tell us a bit about your brand and
              when's best to reach you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="book-name"
                    className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
                  >
                    Name<span className="text-bt-red"> *</span>
                  </label>

                  <input
                    id="book-name"
                    name="name"
                    type="text"
                    required
                    className="w-full border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
                  />
                </div>

                <div>
                  <label
                    htmlFor="book-email"
                    className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
                  >
                    Email<span className="text-bt-red"> *</span>
                  </label>

                  <input
                    id="book-email"
                    name="email"
                    type="email"
                    required
                    className="w-full border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="book-company"
                  className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
                >
                  Company
                </label>

                <input
                  id="book-company"
                  name="company"
                  type="text"
                  className="w-full border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
                />
              </div>

              <div>
                <label
                  htmlFor="book-time"
                  className="mb-2 block text-xs uppercase tracking-[0.2em] text-light-grey"
                >
                  Preferred Time
                </label>

                <select
                  id="book-time"
                  name="preferredTime"
                  defaultValue=""
                  className="w-full border border-grey-1 bg-dark-grey px-4 py-3 text-sm text-white outline-none transition-colors focus:border-bt-red"
                >
                  <option value="" disabled>
                    Select a time slot
                  </option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {status === "error" && (
                <p className="text-sm text-bt-red">
                  Something went wrong sending your request. Please try
                  again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-brand w-full bg-bt-red text-white disabled:opacity-60"
              >
                <HoverFlipText text={status === "sending" ? "Sending…" : "Request Call →"} />
              </button>
            </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </BookCallModalContext.Provider>
  );
}
