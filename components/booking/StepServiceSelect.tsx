"use client";

import { Leaf, MessageCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import { useBooking } from "@/context/BookingContext";
import type { ServiceId } from "@/types";

const options: {
  id: ServiceId;
  title: string;
  description: string;
  icon: typeof MessageCircle;
}[] = [
  {
    id: "therapy",
    title: "Therapy",
    description:
      "Book an online session with a psychologist — introductory conversation, video or audio.",
    icon: MessageCircle,
  },
  {
    id: "nutrition",
    title: "Food & Nutrition",
    description:
      "Choose a consultation or 1-month package with a clinical dietitian.",
    icon: Leaf,
  },
];

export default function StepServiceSelect() {
  const { setService } = useBooking();

  const handleSelect = (id: ServiceId) => {
    setService(id);
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
        What would you like to book?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-body-text md:text-base">
        Choose a service to continue. You can change this later by starting a
        new booking.
      </p>

      <div className="mt-5 flex flex-col gap-3 md:mt-8 md:gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <Card
              key={option.id}
              onClick={() => handleSelect(option.id)}
              hover
              className="p-4 text-left md:p-5"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={20} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-dark-text md:text-lg">
                    {option.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-body-text">
                    {option.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
