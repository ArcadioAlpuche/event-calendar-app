export interface CalendarEvent {
  _id?: string
  title: string
  description?: string
  location?: string
  start: string
  end: string
  allDay?: boolean
}
