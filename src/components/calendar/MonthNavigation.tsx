import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTH_NAMES } from '@/lib/calendar-utils';

interface MonthNavigationProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function MonthNavigation({ month, year, onPrev, onNext, onToday }: MonthNavigationProps) {
  return (
    <div className="flex items-center justify-between px-1 mb-4">
      <div className="flex items-center gap-2">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {MONTH_NAMES[month]} {year}
        </h3>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onToday}
          className="px-3 py-1 text-xs font-body font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
        >
          Today
        </button>
        <button
          onClick={onPrev}
          className="p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={onNext}
          className="p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
