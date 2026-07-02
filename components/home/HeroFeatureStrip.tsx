import { Heart, Leaf, Shield, Users } from "lucide-react";

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
  isLast,
  compact,
}: {
  icon: typeof Heart;
  title: string;
  description: string;
  isLast: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`group flex items-start gap-4 ${
        compact
          ? `py-5 ${isLast ? "" : "border-b border-border"}`
          : `lg:px-8 lg:first:pl-0 lg:last:pr-0 ${!isLast ? "lg:border-r lg:border-hero-accent/12" : ""}`
      }`}
    >
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
        className="hero-theme-day hero-theme-fade pointer-events-none absolute inset-0 hidden md:block"
        style={{ background: DAY_STRIP_GRADIENT }}
        aria-hidden
      />
      <div
        className="hero-theme-night hero-theme-fade pointer-events-none absolute inset-0 hidden md:block"
        style={{ background: NIGHT_STRIP_GRADIENT }}
        aria-hidden
      />

      {/* Mobile — overlapping white card into psychologists section */}
      <div className="relative z-20 mx-auto -mb-20 max-w-[420px] md:hidden">
        <div className="theme-surface relative -mt-10 mx-5 rounded-3xl bg-white px-5 py-2 shadow-[0_8px_32px_rgba(28,16,8,0.08)]">
          {features.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              {...feature}
              isLast={index === features.length - 1}
              compact
            />
          ))}
        </div>
      </div>

      {/* Desktop — 4-column grid */}
      <div className="relative mx-auto hidden max-w-[1400px] md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-4 lg:gap-0">
        {features.map((feature, index) => (
          <FeatureRow
            key={feature.title}
            {...feature}
            isLast={index === features.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
