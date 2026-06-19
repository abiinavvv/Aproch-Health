"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useBooking } from "@/context/BookingContext";
import { sessionTypes } from "@/lib/sessions";
import type { SessionTypeId } from "@/types";

export default function Step1SessionType() {
  const { sessionType, setSessionType, nextStep } = useBooking();

  const select = (id: SessionTypeId) => setSessionType(id);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-dark-text">
        What kind of session are you looking for?
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {sessionTypes.map((type) => (
          <Card
            key={type.id}
            selected={sessionType === type.id}
            onClick={() => select(type.id)}
            className="p-6"
          >
            <Badge variant="green">{type.duration} min</Badge>
            <h3 className="mt-4 text-lg font-semibold text-dark-text">
              {type.label}
            </h3>
            <p className="mt-1 text-2xl font-bold text-primary">
              ₹{type.price}
            </p>
            <p className="mt-2 text-sm font-medium text-body-text">
              {type.tagline}
            </p>
            <p className="mt-2 text-sm leading-[1.7] text-body-text">
              {type.description}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="yellow" onClick={nextStep} disabled={!sessionType}>
          NEXT →
        </Button>
      </div>
    </div>
  );
}
