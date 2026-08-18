export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
export const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

// Contact Us and Book a Strategy Call share one template (free EmailJS plan
// only allows two templates total); Careers keeps its own for the resume attachment.
export const EMAILJS_TEMPLATE_CONTACT =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT ?? "";
export const EMAILJS_TEMPLATE_CAREERS =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CAREERS ?? "";

export const EMAILJS_CONFIGURED = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY
);

export function submittedAt() {
  return new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}
