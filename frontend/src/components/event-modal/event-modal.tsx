import { useState } from 'react'
import type { CalendarEvent } from '../../types/event'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CalendarEvent) => void
  defaultStart: string
  defaultEnd: string
}

export default function EventModal({ isOpen, onClose, onSave, defaultStart, defaultEnd }: Props) {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState(defaultStart)
  const [end, setEnd] = useState(defaultEnd)
  const [allDay, setAllDay] = useState(true)

  const handleSubmit = () => {
    onSave({ title, start, end, allDay })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-neutral-950/70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Event</h2>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Event title" className="border w-full mb-2 p-2" />
        <label className="block mb-1">Start:</label>
        <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} className="border w-full mb-2 p-2" />
        <label className="block mb-1">End:</label>
        <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} className="border w-full mb-2 p-2" />
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="text-sm text-gray-600">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded">Save</button>
        </div>
      </div>
    </div>
  )
}
