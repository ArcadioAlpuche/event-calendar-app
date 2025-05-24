from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Event(BaseModel):
    title: str
    description: Optional[str]
    date: datetime
    location: Optional[str]