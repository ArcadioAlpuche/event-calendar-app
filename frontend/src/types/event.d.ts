export interface CalendarEvent {
  _id?: string // MongoDB ID (optional if you're not using it in the frontend)
  title: string
  description?: string
  location?: string
  start_time: string // ISO format: "2025-05-24T10:00:00"
  end_time: string
}
