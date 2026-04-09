import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, Plus, StickyNote } from 'lucide-react';
import { dateToKey, MONTH_NAMES } from '@/lib/calendar-utils';

export interface Note {
  id: string;
  dateKey: string;
  text: string;
  createdAt: string;
  rangeLabel?: string;
}

interface NotesPanelProps {
  rangeStart: Date | null;
  rangeEnd: Date | null;
  notes: Note[];
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
  month: number;
  year: number;
}

function formatDateLabel(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getDate()}`;
}

export function NotesPanel({ rangeStart, rangeEnd, notes, onAddNote, onDeleteNote, month, year }: NotesPanelProps) {
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const rangeLabel = rangeStart && rangeEnd
    ? `${formatDateLabel(rangeStart)} – ${formatDateLabel(rangeEnd)}`
    : rangeStart
      ? formatDateLabel(rangeStart)
      : null;

  const filteredNotes = notes.filter(n => {
    if (rangeStart && rangeEnd) {
      return n.dateKey === dateToKey(rangeStart) || n.dateKey === dateToKey(rangeEnd);
    }
    if (rangeStart) {
      return n.dateKey === dateToKey(rangeStart);
    }
    // Show all notes for current month
    return n.dateKey.startsWith(`${year}-${month}-`);
  });

  const handleAdd = () => {
    if (!newNote.trim()) return;
    onAddNote(newNote.trim());
    setNewNote('');
    setIsAdding(false);
  };

  return (
    <div className="bg-notes-bg border border-notes-border rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-primary" />
          <h4 className="font-display text-base font-semibold text-foreground">Notes</h4>
        </div>
        {rangeLabel && (
          <span className="text-xs font-body text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
            {rangeLabel}
          </span>
        )}
      </div>

      {!rangeStart && (
        <p className="text-xs font-body text-muted-foreground mb-3">
          Select a date or range to attach notes
        </p>
      )}

      <AnimatePresence mode="popLayout">
        {filteredNotes.map(note => (
          <motion.div
            key={note.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group flex items-start gap-2 mb-2 p-2.5 rounded-lg bg-card border border-border"
          >
            <p className="flex-1 text-sm font-body text-card-foreground leading-relaxed">
              {note.text}
            </p>
            <button
              onClick={() => onDeleteNote(note.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {rangeStart && !isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 text-xs font-body font-medium text-primary hover:text-primary/80 transition-colors mt-2"
        >
          <Plus className="w-3.5 h-3.5" />
          Add note
        </button>
      )}

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2"
        >
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Write a note..."
            className="w-full p-2.5 text-sm font-body rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAdd}
              className="px-3 py-1.5 text-xs font-body font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => { setIsAdding(false); setNewNote(''); }}
              className="px-3 py-1.5 text-xs font-body font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {filteredNotes.length === 0 && rangeStart && !isAdding && (
        <p className="text-xs font-body text-muted-foreground italic mt-1">No notes yet</p>
      )}
    </div>
  );
}
