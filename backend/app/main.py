# backend/main.py or backend/routes/events.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from bson import ObjectId
from pymongo import MongoClient
import os

app = FastAPI()

# CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # adjust this to your frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URL", "mongodb://localhost:27017"))
db = client["calendar"]
events_collection = db["events"]

# Models
class Event(BaseModel):
    title: str
    start: str
    end: str | None = None
    allDay: bool = False
    id: str | None = None

@app.get("/events", response_model=List[Event])
def get_events():
    events = list(events_collection.find())
    return [
        {
            "id": str(event["_id"]),
            "title": event["title"],
            "start": event["start"],
            "end": event.get("end"),
            "allDay": event.get("allDay", False)
        } for event in events
    ]

@app.post("/events", response_model=Event)
def create_event(event: Event):
    result = events_collection.insert_one(event.dict(exclude={"id"}))
    return {**event.dict(), "id": str(result.inserted_id)}

@app.delete("/events/{event_id}")
def delete_event(event_id: str):
    result = events_collection.delete_one({"_id": ObjectId(event_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted"}

@app.put("/events/{event_id}", response_model=Event)
def update_event(event_id: str, event: Event):
    updated = events_collection.update_one(
        {"_id": ObjectId(event_id)},
        {"$set": event.dict(exclude={"id"})}
    )
    if updated.matched_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {**event.dict(), "id": event_id}