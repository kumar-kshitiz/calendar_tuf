import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DAY_NAMES, getDaysInMonth, getFirstDayOfMonth } from '@/lib/calendar-utils';
import { CalendarDay } from './CalendarDay';

interface CalendarGridProps {
  month: number;
  year: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  noteDates: Set<string>;
  onDayClick: (date: Date) => void;
}

export function CalendarGrid({ month, year, rangeStart, rangeEnd, noteDates, onDayClick }: CalendarGridProps) {
  const days = useMemo(() => {
    const result: Date[] = [];
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);

    // Previous month days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevDays = getDaysInMonth(prevYear, prevMonth);
    for (let i = firstDay - 1; i >= 0; i--) {
      result.push(new Date(prevYear, prevMonth, prevDays - i));
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      result.push(new Date(year, month, d));
    }

    // Next month to fill grid
    const remaining = 42 - result.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    for (let d = 1; d <= remaining; d++) {
      result.push(new Date(nextYear, nextMonth, d));
    }

    return result;
  }, [month, year]);

  return (
    <div>
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map(day => (
          <div key={day} className="text-center text-xs font-body font-medium text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${month}-${year}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-7 gap-px"
        >
          {days.map((date, i) => (
            <CalendarDay
              key={i}
              date={date}
              currentMonth={month}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              hasNote={noteDates.has(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)}
              onClick={onDayClick}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
