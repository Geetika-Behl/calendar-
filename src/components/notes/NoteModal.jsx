// ─── NoteModal ────────────────────────────────────────────────────────────────
// Renders the modal dialog for adding/editing/deleting a per-day note.
// Owns no state — receives open/close/save/delete callbacks from parent.
// Returns null when noteModal is null (closed).

import { MONTHS } from "../../utils/calendar";
import { dateKey } from "../../utils/dateUtils";

export default function NoteModal({
  noteModal,     // { y, m, d } | null
  noteInput,
  setNoteInput,
  noteRef,
  notes,
  year,
  onSave,
  onDelete,
  onClose,
}) {
  if (!noteModal) return null;

  const { y, m, d } = noteModal;
  const hasExistingNote = Boolean(notes[dateKey(y, m, d)]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card">
        <div className="modal-title">
          {d} {MONTHS[m]}
        </div>
        <div className="modal-subtitle">{year} — Add Note</div>

        <textarea
          ref={noteRef}
          className="modal-input"
          placeholder="Write something for this day..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          rows={4}
          onKeyDown={(e) => e.key === "Enter" && e.metaKey && onSave()}
        />

        <div className="modal-actions">
          {hasExistingNote && (
            <button className="btn-delete" onClick={onDelete}>
              Delete
            </button>
          )}
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save" onClick={onSave}>
            Save 
          </button>
        </div>
      </div>
    </div>
  );
}
