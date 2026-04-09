# 📅 Interactive Wall Calendar

A polished, responsive **React wall calendar application** built with **TanStack Start**, featuring a realistic wall-calendar aesthetic, smooth month transitions, date-range selection, and integrated note-taking.

---

## ✨ Features

* **Wall Calendar Aesthetic**
  Seasonal hero images paired with a clean monthly calendar grid.

* **Date Range Selection**
  Click to select start/end dates with visual range highlighting.

* **Integrated Notes System**
  Attach notes to individual dates or date ranges.

* **Persistent Storage**
  Notes are saved in `localStorage` and persist across refreshes.

* **Holiday Indicators**
  US holidays highlighted directly in the calendar grid.

* **Smooth Animations**
  Framer Motion crossfade transitions between months.

* **Responsive Layout**
  Desktop side-by-side layout with mobile-friendly stacking.

* **Dark/Light Theme Ready**
  Semantic design tokens make theming straightforward.

---

## 🛠 Tech Stack

| Layer         | Technology                     |
| ------------- | ------------------------------ |
| Framework     | TanStack Start (React 19, SSR) |
| Build Tool    | Vite 7                         |
| Styling       | Tailwind CSS v4                |
| Animations    | Framer Motion                  |
| Icons         | Lucide React                   |
| UI Components | shadcn/ui (Radix UI)           |
| Deployment    | Cloudflare Workers             |

---

## 📦 Prerequisites

Before running the project locally, ensure you have:

* **Node.js** `>= 18`
* **Bun** *(recommended)* or **npm/pnpm**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/interactive-wall-calendar.git
cd interactive-wall-calendar
```

### 2. Install Dependencies

```bash
bun install
```

Or with npm:

```bash
npm install
```

---

### 3. Start Development Server

```bash
bun run dev
```

Or with npm:

```bash
npm run dev
```

App will be available at:

```bash
http://localhost:8080
```

---

### 4. Build for Production

```bash
bun run build
```

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── calendar/
│   │   ├── WallCalendar.tsx
│   │   ├── CalendarGrid.tsx
│   │   ├── CalendarDay.tsx
│   │   ├── MonthNavigation.tsx
│   │   └── HeroImagePanel.tsx
│   │
│   └── notes/
│       └── NotesPanel.tsx
│
├── hooks/
│   ├── useCalendarRange.ts
│   └── useLocalStorage.ts
│
├── lib/
│   └── calendar-utils.ts
│
├── routes/
│   ├── __root.tsx
│   └── index.tsx
│
└── styles.css
```

---

## 🎯 Usage Guide

| Action          | How                                               |
| --------------- | ------------------------------------------------- |
| Select a date   | Click any day in the grid                         |
| Select a range  | Click start date, then end date                   |
| Clear selection | Click the **✕** button                            |
| Add a note      | Select date/range → type note → press Enter / Add |
| Delete a note   | Click trash icon beside note                      |
| Navigate months | Use **‹ ›** arrows or **Today** button            |

---

## 🎨 Design Decisions

### Typography Pairing

* **Playfair Display** for headings
* **DM Sans** for body text

Creates an editorial / print-inspired aesthetic.

---

### Semantic Color Tokens

All colors use **OKLCH semantic tokens** in `styles.css` for:

* Easier theming
* Better accessibility
* Consistent contrast ratios

---

### Frontend-Only Persistence

Uses **localStorage** instead of backend/database:

* Keeps project lightweight
* Simplifies deployment
* Demonstrates frontend state persistence patterns

---

### Motion & Interaction

**AnimatePresence** + Framer Motion used for:

* Smooth month crossfades
* Intentional “page flip” interactions
* Enhanced UX polish


---

## 📸 Preview

> Add screenshots/GIFs here for best GitHub presentation.

```md
![Calendar Preview](./public/preview.png)
```

---

## 🧠 Future Improvements

* Drag-to-select date ranges
* Google Calendar sync
* Recurring notes/reminders
* Backend/database support
* Multi-user shared calendars

---

## 📄 License

Licensed under the **MIT License**.

---

## 🙌 Acknowledgements

Built with inspiration from classic wall calendars and modern editorial UI design.

---

## ⭐ Support

If you like this project:

* Star the repo ⭐
* Fork it 🍴
* Share feedback / contribute 🚀
