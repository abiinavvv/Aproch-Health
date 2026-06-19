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

export default function HeroFeatureStrip() {
  return (
    <div className="hero-theme-sync relative z-10 w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
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

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-4 lg:gap-0">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isLast = index === features.length - 1;

          return (
            <div
              key={feature.title}
              className={`group flex items-start gap-4 lg:px-8 lg:first:pl-0 lg:last:pr-0 ${
                !isLast ? "lg:border-r lg:border-hero-accent/12" : ""
              }`}
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-hero-accent/10 text-hero-accent transition-colors duration-200 group-hover:bg-hero-accent/16 lg:h-16 lg:w-16"
                aria-hidden
              >
                <Icon size={28} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-body text-base font-bold leading-snug text-hero-brown lg:text-lg">
                  {feature.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-hero-subtext lg:mt-2 lg:text-[15px] lg:leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
