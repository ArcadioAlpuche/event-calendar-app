import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
  return (
<FullCalendar
  plugins={[dayGridPlugin]}
  initialView="dayGridMonth"
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,dayGridDay'
  }}
  weekends={true}
  events={[
    { title: 'BJJ Class', date: '2025-06-10' },
    { title: 'Open Mat', date: '2025-06-11' }
  ]}
/>
  );
}