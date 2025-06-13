import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import type { EventInput } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './event-modal';
import type { CalendarEvent } from '../types/event';
import { formatDateTimeLocal } from '../utils/date';

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditEvent, setIsEditEvent] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(undefined);
  const [selectedRange, setSelectedRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/events');
        const data = await response.json();

        const mappedEvents = data.map((event: CalendarEvent) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          allDay: event.allDay,
        }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateSelect = (selectInfo: any) => {
    setSelectedRange({
      start: selectInfo.start,
      end: selectInfo.end,
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: CalendarEvent) => {
    const isEdit = !!eventData.id;
    const url = isEdit
      ? `http://localhost:8000/events/${eventData.id}`
      : 'http://localhost:8000/events';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    })
       .then((res) => res.json())
    .then((returnedEvent) => {
      setEvents((prev) => {
        if (isEdit) {
          return prev.map((event) =>
            event.id === returnedEvent._id || event._id === returnedEvent._id
              ? {
                  ...event,
                  ...returnedEvent,
                  id: returnedEvent._id, // normalize
                }
              : event
          );
        } else {
          return [...prev, { ...returnedEvent, id: returnedEvent._id }];
        }
      });
    })
    .catch(console.error);
  };

  const handleEventEdit = (clickInfo: any) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: formatDateTimeLocal(new Date(clickInfo.event.start)),
      end: formatDateTimeLocal(new Date(clickInfo.event.end)),
      allDay: clickInfo.event.allDay,
    });
    setIsEditEvent(true);
    setIsModalOpen(true);
  };

  const handleEventRemove = (eventData: CalendarEvent) => {
    if (!window.confirm(`Delete event "${eventData.title}"?`)) return;

    fetch(`http://localhost:8000/events/${eventData.id}`, {
      method: 'DELETE',
    }).then(() => {
      setEvents((prev) => prev.filter((e) => e.id !== eventData.id));
    });
  };

  // const handleEventRemove = (clickInfo: any) => {
  //   console.log('clickInfo: ', clickInfo);
  //   if (!window.confirm(`Delete event "${clickInfo.event.title}"?`)) return;

  //   fetch(`http://localhost:8000/events/${clickInfo.event.id}`, {
  //     method: 'DELETE',
  //   }).then(() => {
  //     setEvents((prev) => prev.filter((e) => e.id !== clickInfo.event.id));
  //   });
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditEvent(false);
    setSelectedEvent(undefined);
  };

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-4 shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        height="auto"
        initialView="dayGridMonth"
        selectable={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        weekends={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventEdit}
        timeZone="local"
      />
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          isEdit={isEditEvent}
          onDelete={handleEventRemove}
          selectedRange={selectedRange}
          selectedEvent={selectedEvent}
        />
      )}
    </div>
  );
}
