from sqlmodel import Session, select
from backend.app.database import engine, Story, Summary
from workers.ai_agents.crew import Trendanalysercrew

import time
import datetime

def generate_daily_brief():
    
    interval = int(time.time()) - (24 * 60 * 60)

    with Session(engine) as session:
        statement = (
            select(Story)
            .where(Story.time >= interval)
            .where(Story.relevance_score >= 7)
            .order_by(Story.relevance_score.desc())
            .limit(10)
        )

        stories = session.exec(statement).all()

        if not stories:
            return

        formatted_stories = []
        for story in stories:
            formatted_stories.append(
                f"Title: {story.title} \nURL: {story.url} \nContent:\n{story.parsed_content}\n"
            )

        stories_input = "\n".join(formatted_stories)

        payload = {
            'current_time': str(datetime.datetime.now()),
            'stories': stories_input
        }

        crew_output = Trendanalysercrew().crew().kickoff(inputs=inputs)