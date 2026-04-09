import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HeroImagePanel } from './HeroImagePanel';
import { MonthNavigation } from './MonthNavigation';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel, type Note } from '../notes/NotesPanel';
import { useCalendarRange } from '@/hooks/useCalendarRange';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { dateToKey, MONTH_NAMES } from '@/lib/calendar-utils';
import { X } from 'lucide-react';

export function WallCalendar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const { range, selecting, handleDayClick, clearRange } = useCalendarRange();
  const [notes, setNotes] = useLocalStorage<Note[]>('calendar-notes', []);

  const goNext = useCallback(() => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }, [month]);

  const goPrev = useCallback(() => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }, [month]);

  const goToday = useCallback(() => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  }, []);

  const noteDates = useMemo(() => new Set(notes.map(n => n.dateKey)), [notes]);

  const handleAddNote = useCallback((text: string) => {
    if (!range.start) return;
    const note: Note = {
      id: crypto.randomUUID(),
      dateKey: dateToKey(range.start),
      text,
      createdAt: new Date().toISOString(),
      rangeLabel: range.end
        ? `${MONTH_NAMES[range.start.getMonth()].slice(0, 3)} ${range.start.getDate()} – ${MONTH_NAMES[range.end.getMonth()].slice(0, 3)} ${range.end.getDate()}`
        : undefined,
    };
    setNotes(prev => [...prev, note]);
  }, [range, setNotes]);

  const handleDeleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  }, [setNotes]);

  const rangeLabel = range.start && range.end
    ? `${MONTH_NAMES[range.start.getMonth()].slice(0, 3)} ${range.start.getDate()} – ${MONTH_NAMES[range.end.getMonth()].slice(0, 3)} ${range.end.getDate()}`
    : range.start
      ? `${MONTH_NAMES[range.start.getMonth()].slice(0, 3)} ${range.start.getDate()}`
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl mx-auto"
    >
      {/* Calendar card with shadow */}
      <div className="bg-calendar-paper rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] border border-border overflow-hidden">
        {/* Main layout: stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row lg:min-h-[520px]">
          {/* Hero image */}
          <div className="lg:w-[45%] lg:flex-shrink-0">
            <HeroImagePanel month={month} year={year} />
          </div>

          {/* Calendar + Notes */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
            <MonthNavigation
              month={month}
              year={year}
              onPrev={goPrev}
              onNext={goNext}
              onToday={goToday}
            />

            <CalendarGrid
              month={month}
              year={year}
              rangeStart={range.start}
              rangeEnd={range.end}
              noteDates={noteDates}
              onDayClick={handleDayClick}
            />

            {/* Range indicator */}
            {rangeLabel && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mt-3 px-3 py-1.5 rounded-lg bg-calendar-range"
              >
                <span className="text-xs font-body font-medium text-foreground">
                  {selecting ? 'Select end date…' : rangeLabel}
                </span>
                <button
                  onClick={clearRange}
                  className="p-0.5 rounded hover:bg-secondary text-muted-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            {/* Notes section */}
            <div className="mt-4 flex-1">
              <NotesPanel
                rangeStart={range.start}
                rangeEnd={range.end}
                notes={notes}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
                month={month}
                year={year}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer credit */}
      <p className="text-center text-xs font-body text-muted-foreground mt-6 opacity-60">
        Interactive Wall Calendar · {today.getFullYear()}
      </p>
    </motion.div>
  );
}
