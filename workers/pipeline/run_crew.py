from sqlmodel import Session, select
from backend.app.database import engine, Story, Summary
from workers.ai_agents.crew import Trendanalysercrew

def generate_daily_brief():

    with Session(engine) as session:
        