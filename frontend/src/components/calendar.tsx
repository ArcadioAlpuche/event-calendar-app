import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
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
</div>
  );
}