import { Heart, Leaf, Shield, Users } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

const features = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We listen with empathy and understand your unique journey.",
  },
  {
    icon: Leaf,
    title: "Personalized Support",
    description: "Care tailored to your needs, goals, and pace.",
  },
  {
    icon: Users,
    title: "Evidence-Based",
    description: "Our services are rooted in proven methods.",
  },
  {
    icon: Shield,
    title: "Safe & Confidential",
    description: "Your privacy is our priority. Always.",
  },
];

const DAY_STRIP_GRADIENT =
  "linear-gradient(to bottom, #f8f1e8 0%, #ffffff 100%)";

const NIGHT_STRIP_GRADIENT =
  "linear-gradient(to bottom, #121815 0%, #0e1210 100%)";

function FeatureRow({
  icon: Icon,
  title,
  description,
  compact,
}: {
  icon: typeof Heart;
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className="group flex items-start gap-4">
      <div
        className={`flex shrink-0 items-center justify-center rounded-2xl bg-hero-accent/10 text-hero-accent transition-colors duration-200 group-hover:bg-hero-accent/16 ${
          compact ? "h-12 w-12" : "h-14 w-14 lg:h-16 lg:w-16"
        }`}
        aria-hidden
      >
        <Icon size={compact ? 22 : 28} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 pt-0.5 text-left">
        <p className="font-body text-base font-bold leading-snug text-hero-brown lg:text-lg">
          {title}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-hero-subtext lg:mt-2 lg:text-[15px] lg:leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HeroFeatureStrip() {
  return (
    <div className="hero-theme-sync relative z-10 w-full px-0 pb-0 pt-0 md:px-5 md:py-8 lg:px-12 lg:py-10">
      <div
        className="hero-theme-day hero-theme-fade pointer-events-none absolute inset-0"
        style={{ background: DAY_STRIP_GRADIENT }}
        aria-hidden
      />
      <div
        className="hero-theme-night hero-theme-fade pointer-events-none absolute inset-0"
        style={{ background: NIGHT_STRIP_GRADIENT }}
        aria-hidden
      />

      <div className="relative z-20 mx-auto -mb-20 max-w-[1400px] -mt-10 px-5 md:-mb-16 md:mt-0 md:px-0 lg:-mb-12">
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-4">
          {features.map((feature) => (
            <GlowCard
              key={feature.title}
              glowColor="orange"
              customSize
              className="theme-surface w-full border border-border/80 bg-white/90 p-4 shadow-[0_8px_32px_rgba(28,16,8,0.08)] md:p-5 lg:p-6"
            >
              <FeatureRow {...feature} compact />
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
}
