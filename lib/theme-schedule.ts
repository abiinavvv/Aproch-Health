export const THEME_TIMEZONE = "Asia/Kolkata";
export const NIGHT_START_HOUR = 19;
export const NIGHT_END_HOUR = 6;
export const SESSION_THEME_OVERRIDE_KEY = "theme-session-override";

export type SessionThemeOverride = "day" | "night";

const istHourFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: THEME_TIMEZONE,
  hour: "numeric",
  hour12: false,
});

const liveClockFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: THEME_TIMEZONE,
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function getIstHour(date: Date): number {
  const parts = istHourFormatter.formatToParts(date);
  const hourPart = parts.find((part) => part.type === "hour");
  return hourPart ? Number.parseInt(hourPart.value, 10) : date.getHours();
}

export function isNightBySchedule(date: Date = new Date()): boolean {
  const hour = getIstHour(date);
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
}

export function formatLiveClock(date: Date = new Date()): string {
  return liveClockFormatter.format(date);
}

export function formatLiveClockIso(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: THEME_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    hourCycle: "h23",
  })
    .format(date)
    .replace(", ", "T")
    .replace(/\//g, "-");
}

export function readSessionThemeOverride(): SessionThemeOverride | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(SESSION_THEME_OVERRIDE_KEY);
  return value === "day" || value === "night" ? value : null;
}

export function writeSessionThemeOverride(value: SessionThemeOverride): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_THEME_OVERRIDE_KEY, value);
}

export function resolveNightMode(date: Date = new Date()): boolean {
  const override = readSessionThemeOverride();
  if (override === "day") return false;
  if (override === "night") return true;
  return isNightBySchedule(date);
}

/** Inline script source for beforeInteractive theme init (must mirror resolveNightMode). */
export const themeInitScript = `(function(){try{var k="theme-session-override";var o=sessionStorage.getItem(k);var isNight;if(o==="day"){isNight=false;}else if(o==="night"){isNight=true;}else{var p=new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",hour:"numeric",hour12:false}).formatToParts(new Date());var h=parseInt((p.find(function(x){return x.type==="hour";})||{}).value||"0",10);isNight=h>=19||h<6;}document.documentElement.setAttribute("data-theme",isNight?"night":"day");document.documentElement.style.colorScheme=isNight?"dark":"light";}catch(e){}})();`;
