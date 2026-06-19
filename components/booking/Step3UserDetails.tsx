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
      <h2 className="font-display text-2xl font-semibold text-dark-text">
        Tell us a little about yourself
      </h2>
      <p className="mt-2 text-body-text">
        This stays between you and your psychologist.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <h3 className="mb-4 font-medium text-dark-text">
            How would you like your session?
          </h3>
          <div className="flex flex-col gap-3">
            {modes.map((m) => (
              <Card
                key={m.id}
                selected={sessionMode === m.id}
                onClick={() => setSessionMode(m.id)}
                className="p-4"
              >
                <span className="mr-2">{m.emoji}</span>
                <span className="font-medium">{m.label}</span>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-medium text-dark-text">About You</h3>
          <div className="space-y-4">
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
                  className="mb-1 block text-sm text-body-text"
                >
                  {field.label}
                </label>
                <div className="flex">
                  {field.prefix && (
                    <span className="flex items-center rounded-l-xl border border-r-0 border-border bg-hero-start px-3 text-sm text-muted">
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
                    className={`w-full rounded-xl border border-border px-4 py-3 text-dark-text outline-none focus:border-primary ${field.prefix ? "rounded-l-none" : ""}`}
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
            className="mb-1 block font-medium text-dark-text"
          >
            Send a confidential message to your psychologist before the session
          </label>
          <p className="mb-4 text-xs italic text-muted">
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
            rows={5}
            className="w-full rounded-xl border border-border px-4 py-3 text-dark-text outline-none focus:border-primary resize-none"
          />
          <p className="mt-1 text-right text-xs text-muted">
            {intakeMessage.length}/200
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="yellow" onClick={handleNext} disabled={!isValid}>
          NEXT →
        </Button>
      </div>
    </div>
  );
}
