// ─── WallCalendar (Root Composer) ─────────────────────────────────────────────

import { MONTHS, MONTH_IMAGES, MONTH_PALETTES } from "../../utils/calendar"; // fix only if file exists
import { buildCalendarCells } from "../../utils/dateUtils";
import { buildCalendarStyles } from "../../styles/calendarStyles"; // ✅ FIXED

import { useCalendar } from "../../hooks/useCalendar";   // ✅ FIXED
import { useDateRange } from "../../hooks/useDateRange"; // ✅ FIXED
import { useNotes } from "../../hooks/useNotes";         // ✅ FIXED
import { useTheme } from "../../hooks/useTheme";         // ✅ FIXED

// ✅ FIXED COMPONENT IMPORTS (same folder)
import CalendarBinding from "./CalendarBinding";
import ChevronDivider from "./ChevronDivider";
import MonthNav from "./MonthNav";
import CalendarGrid from "./CalendarGrid";

// ✅ DIFFERENT FOLDERS
import ThemeToggle from "../ui/ThemeToggle";
import HeroPanel from "../ui/HeroPanel";

import NotesPanel from "../notes/NotesPanel";
import NoteModal from "../notes/NoteModal";

export default function WallCalendar() {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const { year, month, today, changeMonth, slideClass } = useCalendar();
  const { theme, isDark, setLight, setDark }            = useTheme();

  const {
    notes,
    noteModal, noteInput, setNoteInput, noteRef,
    openNoteModal, closeNoteModal, saveNote, deleteNote,
    updateMonthNote, getMonthNote, hasNote,
  } = useNotes();

  const { rangeStart, rangeEnd, selecting, handleDayClick, clearRange } =
    useDateRange({ year, month, onSingleDayTap: openNoteModal });

  // ── Derived values (pure lookups) ──────────────────────────────────────────
  const palette   = MONTH_PALETTES[month];
  const cells     = buildCalendarCells(year, month);
  const cardColor = isDark ? "#1c1c24" : "#fff";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{buildCalendarStyles(palette, isDark)}</style>

      <div className="cal-root">
        <div className="calendar-wrapper">

          <CalendarBinding count={12} />

          <div className="calendar-card">
            <ThemeToggle theme={theme} onLight={setLight} onDark={setDark} />

            <div className={`page-content ${slideClass}`} key={`${year}-${month}`}>

              <HeroPanel
                src={MONTH_IMAGES[month]}
                monthName={MONTHS[month]}
                year={year}
              />

              <ChevronDivider
                cardColor={cardColor}
                accentColor={palette.accent}
              />

              <MonthNav
                monthName={MONTHS[month]}
                year={year}
                onPrev={() => changeMonth("prev", clearRange)}
                onNext={() => changeMonth("next", clearRange)}
              />

              <div className="calendar-body">
                <NotesPanel
                  monthNote={getMonthNote(year, month)}
                  onMonthNoteChange={(text) => updateMonthNote(year, month, text)}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  month={month}
                />

                <CalendarGrid
                  year={year}
                  month={month}
                  today={today}
                  cells={cells}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  selecting={selecting}
                  onDayClick={handleDayClick}
                  hasNote={hasNote}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <NoteModal
        noteModal={noteModal}
        noteInput={noteInput}
        setNoteInput={setNoteInput}
        noteRef={noteRef}
        notes={notes}
        year={year}
        onSave={saveNote}
        onDelete={deleteNote}
        onClose={closeNoteModal}
      />
    </>
  );
}
