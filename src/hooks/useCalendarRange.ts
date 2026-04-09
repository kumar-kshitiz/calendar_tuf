import { useState, useCallback } from 'react';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export function useCalendarRange() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [selecting, setSelecting] = useState(false);

  const handleDayClick = useCallback((date: Date) => {
    if (!selecting || !range.start) {
      setRange({ start: date, end: null });
      setSelecting(true);
    } else {
      setRange(prev => ({ start: prev.start, end: date }));
      setSelecting(false);
    }
  }, [selecting, range.start]);

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
    setSelecting(false);
  }, []);

  return { range, selecting, handleDayClick, clearRange };
}
