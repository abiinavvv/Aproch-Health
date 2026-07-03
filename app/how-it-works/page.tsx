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
        <section className="hero-gradient flex min-h-0 items-center px-4 pt-24 pb-8 md:min-h-[50vh] md:py-12 lg:px-6 lg:pb-16">
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="font-display text-2xl font-bold leading-snug text-dark-text md:text-[clamp(2.25rem,5vw,3.5rem)] md:leading-tight">
              Here&apos;s exactly how it works
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-body-text md:mt-6 md:text-lg md:leading-[1.7]">
              Simple, private, and designed around your schedule.
            </p>
          </div>
        </section>

        {steps.map((step, i) => (
          <section
            key={step.title}
            className={`px-4 py-8 md:py-12 lg:px-6 lg:py-20 ${i % 2 === 1 ? "bg-hero-start" : ""}`}
          >
            <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 md:flex-row md:gap-16">
              <div className={`flex-1 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <step.icon size={28} className="text-primary md:h-10 md:w-10" strokeWidth={2} />
                <h2 className="mt-3 font-display text-lg font-semibold text-dark-text md:mt-4 md:text-2xl">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-body-text md:mt-4 md:text-base md:leading-[1.7]">
                  {step.body}
                </p>
              </div>
              <div className={`w-full max-w-[200px] flex-1 md:max-w-none ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="rounded-2xl bg-light-green/50 p-6 text-center md:p-12">
                  <span className="font-display text-4xl font-bold text-primary opacity-30 md:text-6xl">
                    {i + 1}
                  </span>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="px-4 py-8 md:py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[800px]">
            <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
              What happens after you book
            </h2>
            <ul className="mt-4 space-y-3 md:mt-6 md:space-y-4">
              {afterBooking.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-body-text md:gap-3 md:text-base">
                  <span className="shrink-0 text-primary">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-hero-start px-4 py-8 md:py-12 lg:px-6 lg:py-20">
          <div className="mx-auto max-w-[800px]">
            <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
              What to expect in your first session
            </h2>
            <ul className="mt-4 space-y-3 md:mt-6 md:space-y-4">
              {firstSession.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-body-text md:gap-3 md:text-base">
                  <span className="shrink-0 text-primary">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-8 text-center md:py-12 lg:px-6 lg:py-20">
          <Button href="/book" variant="primary" className="!px-5 !py-2.5 text-xs md:!px-6 md:!py-3 md:text-sm">
            Book a Session
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
