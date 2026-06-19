import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { CalendarCheck, Clock, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Step 1: Choose your session type",
    body: "Start with a 30-minute introductory session (₹500) if you're new to therapy — it's a gentle way to get comfortable. Or choose a 60-minute full session (₹999) if you're ready to go deeper on specific concerns like anxiety, burnout, or relationships.",
  },
  {
    icon: Clock,
    title: "Step 2: Pick your slot",
    body: "Browse available dates on our calendar and pick a time that fits your schedule. Slots are updated weekly, and you don't need to create an account. Just choose what works for you.",
  },
  {
    icon: MessageCircle,
    title: "Step 3: Confirm on WhatsApp",
    body: "Review your details and send a pre-filled message to us on WhatsApp. We'll confirm your slot and follow up with any next steps, including payment if applicable.",
  },
];

const afterBooking = [
  "Booking request received on WhatsApp",
  "Slot confirmation from our team",
  "Google Meet link shared by psychologist 30 minutes before session",
  "You don't need to download anything — Google Meet works in browser",
];

const firstSession = [
  "You won't be asked to justify why you're there",
  "The first session is about getting to know you",
  "Nothing leaves the session without your consent",
  "You can stop or reschedule at any time",
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="hero-gradient flex min-h-[60vh] items-center px-4 py-12 lg:px-6">
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight text-dark-text">
              Here&apos;s exactly how it works
            </h1>
            <p className="mt-6 text-lg leading-[1.7] text-body-text">
              Simple, private, and designed around your schedule.
            </p>
          </div>
        </section>

        {steps.map((step, i) => (
          <section
            key={step.title}
            className={`px-4 py-12 lg:px-6 lg:py-20 ${i % 2 === 1 ? "bg-hero-start" : ""}`}
          >
            <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 md:flex-row md:gap-16">
              <div className={`flex-1 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <step.icon size={40} className="text-primary" />
                <h2 className="mt-4 font-display text-2xl font-semibold text-dark-text">
                  {step.title}
                </h2>
                <p className="mt-4 leading-[1.7] text-body-text">{step.body}</p>
              </div>
              <div className={`flex-1 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="rounded-2xl bg-light-green/50 p-12 text-center">
                  <span className="font-display text-6xl font-bold text-primary opacity-30">
                    {i + 1}
                  </span>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="px-4 py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[800px]">
            <h2 className="font-display text-2xl font-semibold text-dark-text">
              What happens after you book
            </h2>
            <ul className="mt-6 space-y-4">
              {afterBooking.map((item) => (
                <li key={item} className="flex gap-3 text-body-text">
                  <span className="text-primary">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-hero-start px-4 py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[800px]">
            <h2 className="font-display text-2xl font-semibold text-dark-text">
              What to expect in your first session
            </h2>
            <ul className="mt-6 space-y-4">
              {firstSession.map((item) => (
                <li key={item} className="flex gap-3 text-body-text">
                  <span className="text-primary">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-12 text-center lg:px-6 lg:py-20">
          <Button href="/book" variant="primary">
            Book a Session
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
