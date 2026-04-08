import { MONTHS, MONTH_IMAGES, MONTH_PALETTES } from "../../utils/calendar";
import { buildCalendarCells } from "../../utils/dateUtils";
import { buildCalendarStyles } from "../../styles/calendarStyles"; 
import { useCalendar } from "../../hooks/useCalendar";   
import { useDateRange } from "../../hooks/useDateRange"; 
import { useNotes } from "../../hooks/useNotes";        
import { useTheme } from "../../hooks/useTheme";        
import CalendarBinding from "./CalendarBinding";
import ChevronDivider from "./ChevronDivider";
import MonthNav from "./MonthNav";
import CalendarGrid from "./CalendarGrid";
import ThemeToggle from "../ui/ThemeToggle";
import HeroPanel from "../ui/HeroPanel";
import NotesPanel from "../notes/NotesPanel";
import NoteModal from "../notes/NoteModal";

export default function WallCalendar() {
  const { year, month, today, changeMonth, slideClass } = useCalendar();
  const { theme, isDark, setLight, setDark } = useTheme();

  const {
    notes,
    noteModal, noteInput, setNoteInput, noteRef,
    openNoteModal, closeNoteModal, saveNote, deleteNote,
    updateMonthNote, getMonthNote, hasNote,
  } = useNotes();

  const { rangeStart, rangeEnd, selecting, handleDayClick, clearRange } =
    useDateRange({ year, month, onSingleDayTap: openNoteModal });

  const palette = MONTH_PALETTES[month];
  const cells   = buildCalendarCells(year, month);

  return (
    <>
      <style>{buildCalendarStyles(palette, isDark)}</style>

      <div className="cal-root">
        <div className="calendar-wrapper">

          <CalendarBinding count={15} />

          <div className="calendar-card">
            <ThemeToggle theme={theme} onLight={setLight} onDark={setDark} />

            <div className={`page-content ${slideClass}`} key={`${year}-${month}`}>

              <HeroPanel
                src={MONTH_IMAGES[month]}
                monthName={MONTHS[month]}
                year={year}
              />

              <ChevronDivider
                isDark={isDark}
                palette={palette}
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