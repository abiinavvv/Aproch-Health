"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useBooking } from "@/context/BookingContext";
import type { SessionMode } from "@/types";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^\d{10}$/.test(phone.replace(/\s/g, ""));
}

export default function Step3UserDetails() {
  const {
    sessionMode,
    name,
    email,
    phone,
    age,
    intakeMessage,
    setSessionMode,
    setUserDetails,
    nextStep,
  } = useBooking();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!validateEmail(value)) error = "Enter a valid email";
        break;
      case "phone":
        if (!value.trim()) error = "Phone is required";
        else if (!validatePhone(value)) error = "Enter a valid 10-digit number";
        break;
      case "age": {
        const n = parseInt(value, 10);
        if (!value) error = "Age is required";
        else if (isNaN(n) || n < 18 || n > 65) error = "Age must be between 18 and 65";
        break;
      }
    }
    setErrors((e) => ({ ...e, [field]: error }));
    return !error;
  };

  const isValid =
    sessionMode &&
    name.trim().length >= 2 &&
    validateEmail(email) &&
    validatePhone(phone) &&
    parseInt(age, 10) >= 18 &&
    parseInt(age, 10) <= 65;

  const handleNext = () => {
    const fields = ["name", "email", "phone", "age"] as const;
    let ok = true;
    fields.forEach((f) => {
      if (!validateField(f, f === "name" ? name : f === "email" ? email : f === "phone" ? phone : age))
        ok = false;
    });
    if (ok && sessionMode) nextStep();
  };

  const modes: { id: SessionMode; label: string; emoji: string }[] = [
    { id: "audio", label: "Audio", emoji: "📞" },
    { id: "video", label: "Video", emoji: "📹" },
  ];

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-dark-text md:text-2xl">
        Tell us a little about yourself
      </h2>
      <p className="mt-2 text-sm text-body-text md:text-base">
        This stays between you and your psychologist.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-5 md:mt-8 md:gap-8 lg:grid-cols-3">
        <div>
          <h3 className="mb-3 text-sm font-medium text-dark-text md:mb-4 md:text-base">
            How would you like your session?
          </h3>
          <div className="flex flex-col gap-2 md:gap-3">
            {modes.map((m) => (
              <Card
                key={m.id}
                selected={sessionMode === m.id}
                onClick={() => setSessionMode(m.id)}
                className="p-3 text-sm md:p-4 md:text-base"
              >
                <span className="mr-2">{m.emoji}</span>
                <span className="font-medium">{m.label}</span>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-dark-text md:mb-4 md:text-base">About You</h3>
          <div className="space-y-3 md:space-y-4">
            {[
              { id: "name", label: "Full Name", type: "text", value: name },
              { id: "email", label: "Email Address", type: "email", value: email },
              { id: "phone", label: "Phone Number", type: "tel", value: phone, prefix: "+91" },
              { id: "age", label: "Age", type: "number", value: age },
            ].map((field) => {
              const fieldError = errors[field.id];

              return (
              <div key={field.id}>
                <label
                  htmlFor={`booking-${field.id}`}
                  className="mb-1 block text-xs text-body-text md:text-sm"
                >
                  {field.label}
                </label>
                <div className="flex">
                  {field.prefix && (
                    <span className="flex items-center rounded-l-xl border border-r-0 border-border bg-hero-start px-2.5 text-xs text-muted md:px-3 md:text-sm">
                      {field.prefix}
                    </span>
                  )}
                  <input
                    id={`booking-${field.id}`}
                    name={field.id}
                    type={field.type}
                    value={field.value}
                    min={field.id === "age" ? 18 : undefined}
                    max={field.id === "age" ? 65 : undefined}
                    onChange={(e) =>
                      setUserDetails({
                        [field.id]: e.target.value,
                      })
                    }
                    onBlur={(e) => validateField(field.id, e.target.value)}
                    {...(fieldError
                      ? {
                          "aria-invalid": "true",
                          "aria-describedby": `booking-${field.id}-error`,
                        }
                      : {})}
                    className={`w-full rounded-xl border border-border px-3 py-2.5 text-sm text-dark-text outline-none focus:border-primary md:px-4 md:py-3 md:text-base ${field.prefix ? "rounded-l-none" : ""}`}
                  />
                </div>
                {fieldError && (
                  <p
                    id={`booking-${field.id}-error`}
                    className="mt-1 text-xs text-error"
                  >
                    {fieldError}
                  </p>
                )}
              </div>
            );
            })}
          </div>
        </div>

        <div>
          <label
            htmlFor="booking-intakeMessage"
            className="mb-1 block text-sm font-medium text-dark-text md:text-base"
          >
            Send a confidential message to your psychologist before the session
          </label>
          <p className="mb-3 text-[11px] italic leading-relaxed text-muted md:mb-4 md:text-xs">
            Your psychologist will read this before meeting you, so you don&apos;t
            have to start from scratch.
          </p>
          <textarea
            id="booking-intakeMessage"
            name="intakeMessage"
            value={intakeMessage}
            maxLength={200}
            onChange={(e) => setUserDetails({ intakeMessage: e.target.value })}
            placeholder="You might share what's been on your mind, or what you'd like to focus on. Completely optional."
            rows={4}
            className="w-full resize-none rounded-xl border border-border px-3 py-2.5 text-sm text-dark-text outline-none focus:border-primary md:px-4 md:py-3 md:text-base"
          />
          <p className="mt-1 text-right text-xs text-muted">
            {intakeMessage.length}/200
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-end md:mt-8">
        <Button variant="yellow" onClick={handleNext} disabled={!isValid} className="!px-4 !py-2.5 text-xs md:!px-6 md:!py-3 md:text-sm">
          NEXT →
        </Button>
      </div>
    </div>
  );
}
