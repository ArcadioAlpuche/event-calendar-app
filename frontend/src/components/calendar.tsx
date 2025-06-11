import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from 'react'
import type { EventInput } from '@fullcalendar/core/index.js'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/events')
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Enter event title')
    if (!title) return

    const newEvent = {
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    }

    fetch('http://localhost:8000/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    })
      .then(res => res.json())
      .then(savedEvent => {
        setEvents((prev) => [...prev, savedEvent])
      }).catch(err => {
      console.error('Error saving event:', err)
      alert('Failed to save event')
    })
  }

  const handleEventRemove = (clickInfo: any) => {
    if (!window.confirm(`Delete event "${clickInfo.event.title}"?`)) return

    fetch(`http://localhost:8000/events/${clickInfo.event.id}`, {
      method: 'DELETE',
    }).then(() => {
      setEvents((prev) => prev.filter(e => e.id !== clickInfo.event.id))
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
    </div>
  )
}
