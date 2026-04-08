# Wall Calendar

A polished, interactive wall calendar component built with React + Vite.  
Inspired by the physical wall calendar aesthetic — spiral binding, hero photography, chevron divider, and a notes sidebar.

---

## Features

- **Wall calendar aesthetic** — spiral rings, full-bleed hero image, chevron divider, Playfair Display typography
- **Month-aware theming** — each month has its own colour palette (ice blue for Jan, rose for Feb, etc.)
- **Page-flip animation** — 3D rotateX transition when navigating months
- **Day range selector** — click once to start, click again to finish; clear visual states for start, in-range, and end days
- **Per-day notes** — tap the same date twice to open a modal and attach a note; a dot appears on days with notes
- **Monthly notes** — ruled textarea in the sidebar for general month memos
- **Holiday markers** — Indian public holidays shown with an italic style and red dot
- **Light / Dark theme** — toggle in the top-right corner
- **Fully responsive** — side-by-side layout on desktop collapses to stacked on mobile (≤ 600 px)
- **localStorage persistence** — notes survive page refresh

---

## Architecture — one file, one job

```
src/
├── constants/calendar.js       Static lookup tables (months, images, palettes, holidays)
├── utils/dateUtils.js          Pure date math — no React, fully unit-testable
├── styles/calendarStyles.js    CSS string builder, parameterised by palette + isDark
│
├── hooks/
│   ├── useCalendar.js          Month/year navigation + page-flip animation state
│   ├── useDateRange.js         Start/end range selection state + click handler
│   ├── useNotes.js             Notes CRUD + localStorage persistence
│   └── useTheme.js             Light/dark toggle
│
└── components/
    ├── WallCalendar.jsx        Composer — wires hooks → components, owns zero logic
    ├── CalendarBinding/        Spiral ring row
    ├── ThemeToggle/            ☀ / 🌙 buttons
    ├── HeroPanel/              Hero image + month/year label
    ├── ChevronDivider/         SVG chevron between image and grid
    ├── MonthNav/               ‹ Month Year › navigation bar
    ├── NotesPanel/             Monthly textarea + range summary
    ├── CalendarGrid/           7-column day grid with all cell states
    └── NoteModal/              Per-day note modal dialog
```

Each hook owns exactly **one slice of state**.  
Each component renders exactly **one visual region**.  
`WallCalendar.jsx` only wires them together — it has zero `useState` calls of its own.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview production build locally
npm run preview
```

**Requirements:** Node.js 18 or later.

---

## Usage

| Interaction | Result |
|---|---|
| Click a date | Sets range **start** |
| Click a different date | Sets range **end** |
| Click the **same** date twice | Opens the **note modal** for that day |
| Type in the sidebar textarea | Saves a **monthly memo** |
| ☀ / 🌙 buttons | Toggles **light / dark** theme |
| ‹ / › buttons | Navigates months (clears current range) |

---

## Extending

- **Add holidays:** edit `HOLIDAYS` in `src/constants/calendar.js`
- **Add a month image:** replace the URL at the matching index in `MONTH_IMAGES`
- **Change a palette:** edit the matching entry in `MONTH_PALETTES`
- **Add a new feature:** add a hook in `src/hooks/`, a component in `src/components/`, wire in `WallCalendar.jsx`
