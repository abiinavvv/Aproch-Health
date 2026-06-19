"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import FAQAccordion from "@/components/home/FAQAccordion";
import { psychologist } from "@/lib/psychologist";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { allFAQ } from "@/lib/faq";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !message) return;
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again."
        );
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="hero-gradient px-4 py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-dark-text">
              We&apos;re here to help
            </h1>
            <p className="mt-4 text-lg text-body-text">
              Reach out before booking, after booking, or just to ask a question.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 lg:px-6 lg:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-semibold text-dark-text">
                Get in touch
              </h2>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
              >
                Chat with us on WhatsApp
              </a>
              <p className="mt-6 text-body-text">
                Email:{" "}
                <a
                  href={`mailto:${psychologist.email}`}
                  className="text-primary hover:underline"
                >
                  {psychologist.email}
                </a>
              </p>
              <p className="mt-4 text-sm text-muted">
                We typically respond within a few hours.
              </p>
              <p className="mt-4 text-sm text-body-text">
                We are an online-only platform. Sessions are conducted via Google Meet.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1 block text-sm text-body-text"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1 block text-sm text-body-text"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1 block text-sm text-body-text"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full rounded-xl border border-border px-4 py-3 outline-none focus:border-primary resize-none"
                  />
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!name || !email || !message || status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
                {status === "success" && (
                  <p className="text-sm text-success">Message sent successfully!</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-error">
                    {errorMessage || "Something went wrong. Please try again."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <FAQAccordion items={allFAQ} heading="Frequently asked questions" />
      </main>
      <Footer />
    </>
  );
}
