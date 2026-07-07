"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/ui/Button";

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  showCurrentTimeButton?: boolean;
}

type Period = "AM" | "PM";

function normalizeHour(h: string): string {
  const n = Number(h);
  if (!Number.isFinite(n)) return h;
  // Return without leading zero: "09" -> "9"
  return String(n);
}

function formatValue(hour: string, minute: string, amPm: Period): string {
  return `${normalizeHour(hour)}:${minute} ${amPm}`;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  disabled,
  error,
  className,
  showCurrentTimeButton = true,
}) => {
  const getDefaultTime = React.useCallback(() => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const ap: Period = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;

    const minute = m < 30 ? "00" : "30";
    const hour = String(h).padStart(2, "0");

    return { hour, minute, amPm: ap };
  }, []);

  const [hour, setHour] = React.useState<string>("");
  const [minute, setMinute] = React.useState<string>("");
  const [amPm, setAmPm] = React.useState<Period>("AM");

  const handleSetCurrentTime = React.useCallback(() => {
    const def = getDefaultTime();
    setHour(def.hour);
    setMinute(def.minute);
    setAmPm(def.amPm);
    onChange?.(formatValue(def.hour, def.minute, def.amPm));
  }, [getDefaultTime, onChange]);

  React.useEffect(() => {
    if (!value) {
      // Controlled by parent (Step2DateTime) in this app; don't force a value here.
      const def = getDefaultTime();
      setHour(def.hour);
      setMinute(def.minute);
      setAmPm(def.amPm);
      return;
    }

    if (typeof value === "string" && value.match(/^\d{1,2}:\d{2} (AM|PM)$/)) {
      const [hm, ap] = value.split(" ");
      const [h, m] = hm.split(":");
      setHour(String(Number(h)).padStart(2, "0"));
      setMinute(m);
      setAmPm(ap as Period);
    }
  }, [getDefaultTime, value]);

  const handleChange = React.useCallback(
    (h: string, m: string, ap: Period) => {
      setHour(h);
      setMinute(m);
      setAmPm(ap);
      if (h && m && ap && onChange) {
        const newValue = formatValue(h, m, ap);
        if (newValue !== value) onChange(newValue);
      }
    },
    [onChange, value]
  );

  const minuteOptions = ["00", "30"];

  return (
    <div
      className={
        className ??
        `flex w-full flex-col items-center gap-2${error ? " rounded-2xl border border-red-500 p-2" : ""}`
      }
    >
      <div className="flex w-full items-center justify-center gap-2">
        <div className="w-20">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(val, minute, amPm),
              [minute, amPm, handleChange]
            )}
            value={hour}
          >
            <SelectTrigger size="sm" aria-label="Select hour">
              <SelectValue placeholder="HH" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span>:</span>
        <div className="w-20">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(hour, val, amPm),
              [hour, amPm, handleChange]
            )}
            value={minute}
          >
            <SelectTrigger size="sm" aria-label="Select minutes">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {minuteOptions.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-24">
          <Select
            disabled={disabled}
            onValueChange={React.useCallback(
              (val: string) => handleChange(hour, minute, val as Period),
              [hour, minute, handleChange]
            )}
            value={amPm}
          >
            <SelectTrigger size="sm" aria-label="Select AM or PM">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {showCurrentTimeButton && (
        <Button
          variant="outline"
          disabled={disabled}
          onClick={handleSetCurrentTime}
          className="px-3! py-2! text-xs"
        >
          Set Current Time
        </Button>
      )}
    </div>
  );
};

