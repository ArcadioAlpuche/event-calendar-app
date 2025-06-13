import { useEffect, useState } from 'react';
import type { CalendarEvent } from '../types/event';
import { CButton } from './c-button';
import clsx from 'clsx';

type Props = {
  isOpen: boolean;
  isEdit?: boolean;
  onClose: () => void;
  onSave: (data: CalendarEvent) => void;
  onDelete: (clickInfo: any) => void;
  selectedEvent?: CalendarEvent;
  selectedRange?: { start: string; end: string };
};

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  isEdit,
  onDelete,
  selectedEvent,
  selectedRange,
}: Props) {
  const [title, setTitle] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [allDay, setAllDay] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && selectedEvent) {
      setTitle(selectedEvent.title || '');
      setStart(selectedEvent.start || '');
      setEnd(selectedEvent.end || '');
      setAllDay(selectedEvent.allDay || false);
    }

    if (isOpen && !selectedEvent) {
      setTitle('');
      setStart('');
      setEnd('');
      setAllDay(false);
    }
  }, [isOpen, selectedEvent]);

  const handleSubmit = () => {
    if (new Date(end) < new Date(start)) {
      setDateError(true);
      return;
    }
    setDateError(false);
    onSave({
      title,
      start: allDay ? (selectedRange?.start ?? '') : start,
      end: allDay ? (selectedRange?.end ?? '') : end,
      allDay,
      id: selectedEvent?.id
    });
    onClose();
  };

  const handleDelete = () => {
    onDelete({ title, start, end, allDay });
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

  useEffect(() => {
    if (allDay) {
      // Convert existing start and end strings to Date objects
      const startDate = new Date(selectedEvent?.start || selectedRange?.start || '');
      const endDate = new Date(selectedEvent?.end || selectedRange?.end || '');

      // Normalize to YYYY-MM-DD for all-day events
      const formatAllDay = (date: Date) => date.toISOString().split('T')[0] + 'T00:00';

      setStart(formatAllDay(startDate));
      setEnd(formatAllDay(endDate));
    }
  }, [allDay]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        {isEdit && (
          <div className="flex justify-end">
            <button className="mb-2 flex-none text-sm text-gray-500" onClick={handleDelete}>
              delete
            </button>
          </div>
        )}
        <h2 className="mb-4 flex-2 text-lg font-bold"> {isEdit ? 'Edit Event' : 'Add Event'}</h2>
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
          className={clsx(
            'mb-2 w-full border p-2',
            allDay ? 'cursor-not-allowed bg-gray-100' : 'bg-white'
          )}
          disabled={allDay}
        />
        <label className="mb-1 block">End:</label>
        <input
          type="datetime-local"
          value={end}
          onChange={handleEndChange}
          min={start}
          className={clsx(
            'mb-2 w-full border p-2',
            allDay ? 'cursor-not-allowed bg-gray-100' : 'bg-white'
          )}
          disabled={allDay}
        />
        <div className="mt-4 flex items-center space-x-2">
          <input
            id="allDay"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={allDay}
            onChange={(e) => {
              setAllDay(e.target.checked);
            }}
          />
          <label htmlFor="allDay" className="text-sm font-medium text-gray-700">
            All Day Event
          </label>
        </div>
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
