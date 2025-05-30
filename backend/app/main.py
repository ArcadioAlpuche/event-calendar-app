from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import events

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only! Lock this down in prod.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(events.router, prefix="/events")