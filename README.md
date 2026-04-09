# calendar_tuf
Interactive Wall Calendar
A polished, interactive React calendar component built with TanStack Start, featuring a wall calendar aesthetic with seasonal hero images, date range selection, and an integrated notes system.

Interactive Wall Calendar

✨ Features
Wall Calendar Aesthetic — Prominent seasonal hero images paired with a clean monthly grid
Day Range Selector — Click to select a start and end date with clear visual states (start, end, in-between)
Integrated Notes — Attach notes to selected dates or date ranges, persisted in localStorage
Holiday Markers — US holidays are highlighted on the calendar grid
Smooth Animations — Crossfade transitions between months using Framer Motion
Fully Responsive — Side-by-side layout on desktop, stacked on mobile
Dark/Light Ready — Semantic design tokens for easy theming
🛠 Tech Stack
Layer	Technology
Framework	TanStack Start (React 19, SSR)
Build Tool	Vite 7
Styling	Tailwind CSS v4
Animations	Framer Motion
Icons	Lucide React
UI Primitives	shadcn/ui (Radix UI)
Deployment	Cloudflare Workers (production)
📦 Prerequisites
Node.js ≥ 18
Bun (recommended) or npm/pnpm
🚀 Getting Started
1. Clone the repository
git clone <your-repo-url>
cd <folder-name>
2. Install dependencies
bun install
# or
npm install
3. Start the development server
bun run dev
# or
npm run dev
The app will be available at http://localhost:8080.

4. Build for production
bun run build
📁 Project Structure
src/
├── components/
│   ├── calendar/
│   │   ├── WallCalendar.tsx      # Main calendar container
│   │   ├── CalendarGrid.tsx      # Monthly date grid (42-cell layout)
│   │   ├── CalendarDay.tsx       # Individual day cell with visual states
│   │   ├── MonthNavigation.tsx   # Month/year header with prev/next controls
│   │   └── HeroImagePanel.tsx    # Seasonal image with crossfade animation
│   ├── notes/
│       └── NotesPanel.tsx        # Notes CRUD interface
│   
├── hooks/
│   ├── useCalendarRange.ts       # Date range selection state machine
│   └── useLocalStorage.ts        # Persistent localStorage hook
├── lib/
│   └── calendar-utils.ts         # Date math, holidays, month constants
├── routes/
│   ├── __root.tsx                # Root layout (HTML shell, fonts, meta)
│   └── index.tsx                 # Home page rendering the calendar
└── styles.css                    # Design tokens & Tailwind theme
🎯 Usage
Action	How
Select a date	Click any day in the grid
Select a range	Click a start date, then click an end date
Clear selection	Click the ✕ button on the range indicator
Add a note	Select a date/range, type in the notes area, and press Enter or click Add
Delete a note	Click the trash icon next to any note
Navigate months	Use the ‹ › arrows or click "Today" to jump back
🎨 Design Decisions
Serif + Sans pairing: Playfair Display for headings, DM Sans for body text — gives the calendar an editorial, print-inspired feel.
OKLCH color tokens: All colors defined as semantic tokens in styles.css for easy theming and consistent contrast.
localStorage persistence: Notes survive page refreshes without any backend, keeping the project strictly frontend.
AnimatePresence crossfades: Month transitions feel smooth and intentional, reinforcing the "page flip" metaphor.
📄 License
MIT