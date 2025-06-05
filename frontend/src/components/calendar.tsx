import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar() {
  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-4 shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        weekends={true}
        events={[
          { title: 'BJJ Class', date: '2025-06-10' },
          { title: 'Open Mat', date: '2025-06-11' },
        ]}
      />
    </div>
  )
}
