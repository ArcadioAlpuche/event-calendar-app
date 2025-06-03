from fastapi import FastAPI, HTTPException
from app.models import Event
from app.database import event_collection
from bson import ObjectId
import bson
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all during development — tighten later for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, world"}

# Helper to serialize MongoDB documents
def serialize_event(event) -> dict:
    return {
        "id": str(event["_id"]),
        "title": event["title"],
        "description": event.get("description"),
        "location": event.get("location"),
        "start_time": event["start_time"].isoformat(),
        "end_time": event["end_time"].isoformat(),
    }

@app.post("/events")
async def create_event(event: Event):
    event_dict = event.dict()
    result = event_collection.insert_one(event_dict)
    return {"id": str(result.inserted_id)}

@app.get("/events")
async def get_events():
    events = list(event_collection.find())
    return [serialize_event(e) for e in events]


