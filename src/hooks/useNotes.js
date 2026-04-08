// Owns: per-day notes map, per-month notes map, note modal open/close state.
// Persists to localStorage so notes survive page refresh.

import { useState, useRef, useEffect } from "react";
import { dateKey, monthKey } from "../utils/dateUtils";

const LS_KEY_DAY   = "wallcal_notes_day";
const LS_KEY_MONTH = "wallcal_notes_month";

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
}

export function useNotes() {
  const [notes, setNotes] = useState(() => loadFromStorage(LS_KEY_DAY,   {}));
  const [monthNotes, setMonthNotes] = useState(() => loadFromStorage(LS_KEY_MONTH, {}));
  const [noteModal, setNoteModal] = useState(null);  
  const [noteInput, setNoteInput] = useState("");
  const noteRef = useRef(null);

  useEffect(() => { saveToStorage(LS_KEY_DAY, notes); }, [notes]);

  // Persist month-notes to localStorage whenever they change
  useEffect(() => { saveToStorage(LS_KEY_MONTH, monthNotes); }, [monthNotes]);

  const openNoteModal = (y, m, d) => {
    const k = dateKey(y, m, d);
    setNoteModal({ y, m, d });
    setNoteInput(notes[k] || "");
    setTimeout(() => noteRef.current?.focus(), 100);
  };

  /** Save the current noteInput to the open modal's date, then close. */
  const saveNote = () => {
    if (!noteModal) return;
    const k = dateKey(noteModal.y, noteModal.m, noteModal.d);
    setNotes(prev => ({ ...prev, [k]: noteInput }));
    setNoteModal(null);
  };

  /** Delete the note for the currently open modal's date, then close. */
  const deleteNote = () => {
    if (!noteModal) return;
    const k = dateKey(noteModal.y, noteModal.m, noteModal.d);
    setNotes(prev => { const n = { ...prev }; delete n[k]; return n; });
    setNoteModal(null);
  };

  /** Update the monthly textarea note for a given year+month. */
  const updateMonthNote = (y, m, text) => {
    const k = monthKey(y, m);
    setMonthNotes(prev => ({ ...prev, [k]: text }));
  };

  const getMonthNote = (y, m) => monthNotes[monthKey(y, m)] || "";

  /** Returns true if a given day has a saved note. */
  const hasNote = (y, m, d) => Boolean(notes[dateKey(y, m, d)]);

  const closeNoteModal = () => setNoteModal(null);

  return {
    notes,  
    noteModal, noteInput, setNoteInput, noteRef,
    openNoteModal, closeNoteModal, saveNote, deleteNote,
    updateMonthNote, getMonthNote, hasNote,
  };
}
