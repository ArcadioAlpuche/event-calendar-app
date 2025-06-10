# Event Calendar App (Monorepo)

A simple full-stack calendar app built with a monorepo structure.  
The frontend uses **React**, **Vite**, **Tailwind CSS**, and **FullCalendar**,  
while the backend uses **FastAPI**, **MongoDB**, and **Pydantic**.

---

## Project Structure
```bash
event-calendar-app/
├── frontend/ # React + Vite + Tailwind + FullCalendar
└── backend/ # FastAPI + MongoDB
```

## Getting Started

### Prerequisites

- Node.js + npm
- Python 3.10+
- MongoDB running locally (or MongoDB Atlas)


### Backend Setup (FastAPI + MongoDB)

```bash
cd backend
pip install -r requirements.txt  # or use a virtualenv
uvicorn app.main:app --reload

Runs at: http://localhost:8000
API Docs: http://localhost:8000/docs
```

### Frontend Setup (React + Vite)
```bash
Copy
Edit
cd frontend
npm install
npm run dev

Runs at: http://localhost:5173
```

## Features
- View calendar events
- Create events by clicking on dates
- Backend routes for reading/writing events
- MongoDB as a persistent data store

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, FullCalendar
- Backend: FastAPI, Pydantic, MongoDB

