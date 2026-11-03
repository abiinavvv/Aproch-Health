"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooking } from "@/context/BookingContext";
import type { SessionMode } from "@/types";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const COUNTRY_CODES = [
  {
    code: "+91",
    flag: "🇮🇳",
    flagSrc: "/images/flags/in.png",
    digits: 10,
  },
  {
    code: "+971",
    flag: "🇦🇪",
    flagSrc: "/images/flags/ae.png",
    digits: 9,
  },
] as const;

function getCountryDigits(dialCode: string) {
  return COUNTRY_CODES.find((c) => c.code === dialCode)?.digits ?? 10;
}

function getCountry(dialCode: string) {
  return COUNTRY_CODES.find((c) => c.code === dialCode) ?? COUNTRY_CODES[0];
}

function CountryFlag({
  dialCode,
  className = "h-4 w-5",
}: {
  dialCode: string;
  className?: string;
}) {
  const country = getCountry(dialCode);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={country.flagSrc}
      alt={country.flag}
      width={20}
      height={15}
      className={`inline-block rounded-[2px] object-cover ${className}`}
    />
  );
}

function validatePhone(phone: string, dialCode: string) {
  const digits = getCountryDigits(dialCode);
  return new RegExp(`^\\d{${digits}}$`).test(phone.replace(/\D/g, ""));
}

/** Strip country codes / leading zeros from autofill and cap to country length. */
function normalizePhoneInput(raw: string, dialCode: string): string {
  let digits = raw.replace(/\D/g, "");
  const max = getCountryDigits(dialCode);

  digits = digits.replace(/^0+/, "");

  // Longer prefixes first so 971 is not partially matched as 91
  for (const prefix of ["971", "91"] as const) {
    if (digits.startsWith(prefix) && digits.length > max) {
      digits = digits.slice(prefix.length);
      break;
    }
  }

  digits = digits.replace(/^0+/, "");
  return digits.slice(0, max);
}

export default function Step3UserDetails() {
  const {
    service,
    sessionMode,
    name,
    email,
    phone,
    phoneCountryCode,
    age,
    intakeMessage,
    setSessionMode,
    setUserDetails,
    nextStep,
  } = useBooking();

  const professionalLabel =
    service === "nutrition" ? "dietitian" : "psychologist";

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
        else if (!validatePhone(value, phoneCountryCode))
          error = `Enter a valid ${getCountryDigits(phoneCountryCode)}-digit number`;
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
    validatePhone(phone, phoneCountryCode) &&
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
        This stays between you and your {professionalLabel}.
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
              { id: "phone", label: "Phone Number", type: "tel", value: phone },
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
                <div className="flex min-w-0">
                  {field.id === "phone" && (
                    <Select
                      value={phoneCountryCode}
                      onValueChange={(code) => {
                        const normalized = normalizePhoneInput(phone, code);
                        setUserDetails({ phoneCountryCode: code, phone: normalized });
                        validateField("phone", normalized);
                      }}
                    >
                      <SelectTrigger
                        size="sm"
                        aria-label="Country code"
                        className="h-auto w-auto! max-w-[5.5rem] shrink-0 gap-1 rounded-l-xl rounded-r-none border-r-0 bg-hero-start px-1.5 py-2.5 text-xs md:max-w-[6.25rem] md:gap-1.5 md:px-2 md:py-3 md:text-sm"
                      >
                        <SelectValue>
                          <span className="inline-flex items-center gap-1">
                            <CountryFlag dialCode={phoneCountryCode} className="h-3.5 w-4" />
                            <span className="tabular-nums">{phoneCountryCode}</span>
                          </span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            <span className="inline-flex items-center gap-2">
                              <CountryFlag dialCode={c.code} />
                              <span>{c.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <input
                    id={`booking-${field.id}`}
                    name={field.id}
                    type={field.type}
                    value={field.value}
                    inputMode={field.id === "phone" ? "numeric" : undefined}
                    autoComplete={field.id === "phone" ? "tel-national" : undefined}
                    min={field.id === "age" ? 18 : undefined}
                    max={field.id === "age" ? 65 : undefined}
                    onChange={(e) => {
                      if (field.id === "phone") {
                        const normalized = normalizePhoneInput(
                          e.target.value,
                          phoneCountryCode
                        );
                        setUserDetails({ phone: normalized });
                        return;
                      }
                      setUserDetails({
                        [field.id]: e.target.value,
                      });
                    }}
                    onBlur={(e) => {
                      if (field.id === "phone") {
                        const normalized = normalizePhoneInput(
                          e.target.value,
                          phoneCountryCode
                        );
                        if (normalized !== phone) setUserDetails({ phone: normalized });
                        validateField("phone", normalized);
                        return;
                      }
                      validateField(field.id, e.target.value);
                    }}
                    {...(fieldError
                      ? {
                          "aria-invalid": "true",
                          "aria-describedby": `booking-${field.id}-error`,
                        }
                      : {})}
                    className={`min-w-0 rounded-xl border border-border px-3 py-2.5 text-sm text-dark-text outline-none focus:border-primary md:px-4 md:py-3 md:text-base ${field.id === "phone" ? "w-auto flex-1 rounded-l-none" : "w-full"}`}
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
            Send a confidential message to your {professionalLabel} before the
            session
          </label>
          <p className="mb-3 text-[11px] italic leading-relaxed text-muted md:mb-4 md:text-xs">
            Your {professionalLabel} will read this before meeting you, so you
            don&apos;t have to start from scratch.
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
