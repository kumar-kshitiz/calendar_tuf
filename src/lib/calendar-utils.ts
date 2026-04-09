export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const MONTH_IMAGES: Record<number, string> = {
  0: '/images/calendar-hero/january.jpg',
  1: '/images/calendar-hero/february.jpg',
  2: '/images/calendar-hero/march.jpg',
  3: '/images/calendar-hero/april.jpg',
  4: '/images/calendar-hero/may.jpg',
  5: '/images/calendar-hero/june.jpg',
  6: '/images/calendar-hero/july.jpg',
  7: '/images/calendar-hero/august.jpg',
  8: '/images/calendar-hero/september.jpg',
  9: '/images/calendar-hero/october.jpg',
  10: '/images/calendar-hero/november.jpg',
  11: '/images/calendar-hero/december.jpg',
};

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t >= s && t <= e;
}

export function dateToKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export interface Holiday {
  month: number;
  day: number;
  name: string;
}

export const US_HOLIDAYS: Holiday[] = [
  { month: 0, day: 1, name: "New Year's Day" },
  { month: 0, day: 20, name: "MLK Day" },
  { month: 1, day: 14, name: "Valentine's Day" },
  { month: 1, day: 17, name: "Presidents' Day" },
  { month: 4, day: 26, name: "Memorial Day" },
  { month: 5, day: 19, name: "Juneteenth" },
  { month: 6, day: 4, name: "Independence Day" },
  { month: 8, day: 1, name: "Labor Day" },
  { month: 9, day: 13, name: "Columbus Day" },
  { month: 10, day: 11, name: "Veterans Day" },
  { month: 10, day: 27, name: "Thanksgiving" },
  { month: 11, day: 25, name: "Christmas" },
  { month: 11, day: 31, name: "New Year's Eve" },
];

export function getHoliday(month: number, day: number): Holiday | undefined {
  return US_HOLIDAYS.find(h => h.month === month && h.day === day);
}
