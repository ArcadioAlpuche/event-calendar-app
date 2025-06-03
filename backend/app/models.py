from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Event(BaseModel):
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    start_time: datetime
    end_time: datetime