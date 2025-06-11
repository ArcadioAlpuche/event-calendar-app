import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from 'react'
import type { EventInput } from '@fullcalendar/core/index.js'
import interactionPlugin from '@fullcalendar/interaction'
import EventModal from './event-modal/event-modal'
import type { CalendarEvent } from '../types/event'

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  })

  useEffect(() => {
    fetch('http://localhost:8000/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
  }, [])

  const handleDateSelect = (selectInfo: any) => {
    setSelectedRange({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    })
    setIsModalOpen(true)
  }

  const handleSaveEvent = (eventData: CalendarEvent) => {
    fetch('http://localhost:8000/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    })
      .then((res) => res.json())
      .then((newEvent) => setEvents((prev) => [...prev, newEvent]))
      .catch(console.error)
  }

  const handleEventRemove = (clickInfo: any) => {
    if (!window.confirm(`Delete event "${clickInfo.event.title}"?`)) return

    fetch(`http://localhost:8000/events/${clickInfo.event.id}`, {
      method: 'DELETE',
    }).then(() => {
      setEvents((prev) => prev.filter((e) => e.id !== clickInfo.event.id))
    })
  }

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
        eventClick={handleEventRemove}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        defaultStart={selectedRange.start}
        defaultEnd={selectedRange.end}
      />
    </div>
  )
}
