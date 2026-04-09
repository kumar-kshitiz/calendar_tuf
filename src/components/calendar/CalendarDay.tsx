import { cn } from '@/lib/utils';
import { isSameDay, isInRange, getHoliday } from '@/lib/calendar-utils';

interface CalendarDayProps {
  date: Date;
  currentMonth: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  hasNote: boolean;
  onClick: (date: Date) => void;
}

export function CalendarDay({ date, currentMonth, rangeStart, rangeEnd, hasNote, onClick }: CalendarDayProps) {
  const today = new Date();
  const isToday = isSameDay(date, today);
  const isCurrentMonth = date.getMonth() === currentMonth;
  const isStart = rangeStart ? isSameDay(date, rangeStart) : false;
  const isEnd = rangeEnd ? isSameDay(date, rangeEnd) : false;
  const inRange = isInRange(date, rangeStart, rangeEnd) && !isStart && !isEnd;
  const holiday = getHoliday(date.getMonth(), date.getDate());

  return (
    <button
      onClick={() => onClick(date)}
      className={cn(
        'relative flex flex-col items-center justify-center h-10 sm:h-11 rounded-lg font-body text-sm transition-all duration-200',
        !isCurrentMonth && 'opacity-30',
        isCurrentMonth && 'hover:bg-secondary',
        inRange && 'bg-calendar-range rounded-none',
        isStart && 'bg-calendar-range-edge text-calendar-range-edge-fg rounded-r-none',
        isEnd && 'bg-calendar-range-edge text-calendar-range-edge-fg rounded-l-none',
        isStart && isEnd && 'rounded-lg',
        isToday && !isStart && !isEnd && 'ring-2 ring-calendar-today ring-inset font-semibold',
      )}
      title={holiday?.name}
    >
      <span className={cn(holiday && isCurrentMonth && 'text-calendar-holiday font-medium')}>
        {date.getDate()}
      </span>
      {hasNote && (
        <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-primary" />
      )}
      {holiday && isCurrentMonth && (
        <span className="absolute -top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-calendar-holiday" />
      )}
    </button>
  );
}
