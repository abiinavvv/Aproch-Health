"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useBooking } from "@/context/BookingContext";
import {
  formatNutritionFee,
  nutritionOffers,
} from "@/lib/nutrition";
import type { NutritionOfferId } from "@/types";

export default function StepNutritionOffer() {
  const { nutritionOfferId, setNutritionOfferId, nextStep } = useBooking();

  const handleSelect = (id: NutritionOfferId) => {
    setNutritionOfferId(id);
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
        Choose your nutrition offer
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-body-text md:text-base">
        Start with a single consultation, or choose a month of guided support.
        Payment details are shared when we confirm on WhatsApp.
      </p>

      <div className="mt-5 flex flex-col gap-3 md:mt-8 md:gap-4">
        {nutritionOffers.map((offer) => (
          <Card
            key={offer.id}
            selected={nutritionOfferId === offer.id}
            onClick={() => handleSelect(offer.id)}
            className="p-4 text-left md:p-5"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <p className="font-semibold text-dark-text md:text-lg">{offer.label}</p>
              <p className="text-sm font-bold text-primary md:text-base">
                {formatNutritionFee(offer.price)}
              </p>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-body-text md:text-sm">
              {offer.description}
            </p>
            <p className="mt-2 text-[11px] text-muted md:text-xs">
              {offer.duration} min kickoff · online
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-5 flex justify-end md:mt-8">
        <Button
          variant="yellow"
          onClick={nextStep}
          disabled={!nutritionOfferId}
          className="!px-4 !py-2.5 text-xs md:!px-6 md:!py-3 md:text-sm"
        >
          NEXT →
        </Button>
      </div>
    </div>
  );
}
