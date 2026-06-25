export type CrisisHelpline = {
  name: string;
  hours: string;
  phone: string;
  tel: string;
};

export type CrisisSection = {
  id: string;
  title: string;
  helplines: CrisisHelpline[];
};

export const CRISIS_LOCATION = "India";

export const COLLAPSED_SUICIDE_HELPLINE_COUNT = 3;

export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:${digits}` : "#";
}

function helpline(
  name: string,
  hours: string,
  phone: string
): CrisisHelpline {
  return { name, hours, phone, tel: toTelHref(phone) };
}

export const crisisHelplineSections: CrisisSection[] = [
  {
    id: "suicide",
    title: "Suicide Helplines",
    helplines: [
      helpline("Tele MANAS", "24/7", "14416"),
      helpline("iCall", "Mon-Sat: 08:00 - 22:00", "+91 9152987821"),
      helpline("Vandrevala Foundation", "24/7", "+91 9999666555"),
      helpline("Pratheeksha Kerala", "10:00 - 18:00", "+91 4842448830"),
      helpline("Sneha Chennai", "10am to 10pm on all days", "+91 4424640050"),
      helpline("Maithri Kochi", "Mon-Sun 10:00 - 19:00", "+91 4842540530"),
      helpline("Sahai Bangalore", "Mon-Sat 10:00 - 20:00", "+91 8025497777"),
    ],
  },
  {
    id: "domestic-violence",
    title: "Domestic Violence Helplines",
    helplines: [
      helpline("Sneha", "24/7", "+91 9892278287"),
      helpline("Special Cell", "24/7", "1091"),
    ],
  },
  {
    id: "child",
    title: "Child Helplines",
    helplines: [
      helpline("Childline India Foundation", "24/7", "1098"),
    ],
  },
  {
    id: "emergency",
    title: "Emergency Helplines",
    helplines: [
      helpline("Police", "24/7", "100"),
      helpline("All Emergency Services", "24/7", "112"),
    ],
  },
];
