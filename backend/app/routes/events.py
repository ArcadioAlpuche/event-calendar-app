from fastapi import APIRouter, HTTPException
from app.schemas import Event
from app.database import event_collection
from bson import ObjectId

router = APIRouter()

@router.get("/")
async def get_events():
    events = []
    for event in event_collection.find():
        event["_id"] = str(event["_id"])
        events.append(event)
    return events

@router.post("/")
async def create_event(event: Event):
    result = event_collection.insert_one(event.dict())
    return {"id": str(result.inserted_id)}