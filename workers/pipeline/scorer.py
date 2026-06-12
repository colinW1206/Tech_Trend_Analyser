from sqlmodel import Session, select
from backend.app.database import engine, Story

from dotenv import load_dotenv
from litellm import completion

import requests
import time
import os

load_dotenv()

PROMPT = """
    You are evaluating a Hacker News article for the daily
    news brief.

    Please output a JSON object with these exact two keys:
    - "relevance_score": integer from 1-10
    - "score_explanation": a concise explanation of the score
"""

interval = int(time.time()) - (24 * 60 * 60)

with Session(engine) as session:
    statement = select(Story).where(Story.time >= interval)
    
    recent_stories = session.exec(statement).all()

    for story in recent_stories:
        if story.parsed_content:
            payload = {f"Article Content:\n{story.parsed_content}"}

            response = completion(
                model=os.getenv("OPENAI_MODEL_NAME"),

                messages=[
                    {"role": "system", "content": PROMPT}
                    {"role": "user", "content": payload}
                ],

                response_format={"type": "json_object"}
            )
