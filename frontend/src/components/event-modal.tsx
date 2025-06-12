import { useState } from 'react';
import type { CalendarEvent } from '../types/event';
import { CButton } from './c-button';
import { formatDateTimeLocal } from '../utils/date';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CalendarEvent) => void;
};

export default function EventModal({ isOpen, onClose, onSave }: Props) {
  const [title, setTitle] = useState<string>('');
  const [start, setStart] = useState(() => formatDateTimeLocal(new Date()));
  const [end, setEnd] = useState<string>('');
  const [allDay, setAllDay] = useState<boolean>(true);
  const [dateError, setDateError] = useState<boolean>(false);

  const handleSubmit = () => {
    if (new Date(end) < new Date(start)) {
      setDateError(true);
      return;
    }
    setDateError(false);
    onSave({ title, start, end, allDay });
    onClose();
  };

  if (!isOpen) return null;

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    setStart(newStart);

    // reset end if now invalid
    if (end && new Date(newStart) > new Date(end)) {
      setEnd('');
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Add Event</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className="mb-2 w-full border p-2"
        />
        <label className="mb-1 block">Start:</label>
        <input
          type="datetime-local"
          value={start}
          onChange={handleStartChange}
          className="mb-2 w-full border p-2"
        />
        <label className="mb-1 block">End:</label>
        <input
          type="datetime-local"
          value={end}
          onChange={handleEndChange}
          min={start}
          className="mb-2 w-full border p-2"
        />
        {dateError && (
          <div className="mb-2 text-sm text-red-500">
            End date/time cannot be before start date/time.
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <CButton onClick={onClose} variant="secondary">
            Cancel
          </CButton>
          <CButton onClick={handleSubmit} variant="primary">
            Save
          </CButton>
        </div>
      </div>
    </div>
  );
}
