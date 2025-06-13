from pydantic import BaseModel
from typing import Optional

class Event(BaseModel):
    id: Optional[str] = None  # Used for frontend/backend symmetry
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    start: str  # ISO string, e.g., "2025-06-12T11:39"
    end: str
    allDay: Optional[bool] = False