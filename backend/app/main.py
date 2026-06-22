from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from backend.app.database import engine, Summary

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/summaries")
def get_summaries():
    
    with Session(engine) as session:

        statement = select(Summary).order_by(Summary.date.desc())

        summaries = session.exec(statement).all()

        return summaries
