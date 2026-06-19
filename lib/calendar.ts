import { parseTimeSlot } from "./sessions";

export function formatDisplayDate(isoDate: string): string {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function buildGoogleCalendarUrl(params: {
  psychologistName: string;
  date: string;
  timeSlot: string;
  durationMinutes: number;
}): string {
  const { hours, minutes } = parseTimeSlot(params.timeSlot);
  const start = new Date(params.date + "T00:00:00");
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + params.durationMinutes * 60 * 1000);

  const formatISO = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const text = encodeURIComponent(
    `Therapy Session with ${params.psychologistName}`
  );
  const dates = `${formatISO(start)}/${formatISO(end)}`;
  const details = encodeURIComponent(
    "Aproch Health session. Google Meet link will be shared 30 min before."
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`;
}
