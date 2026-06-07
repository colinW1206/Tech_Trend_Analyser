from sqlmodel import Session
from backend.app.database import engine, Story

import requests
import time

top_stories_url = "https://hacker-news.firebaseio.com/v0/topstories.json"
response = requests.get(top_stories_url)
story_ids = response.json()

top_10_ids = story_ids[:10]

for story_id in top_10_ids:
    item_url = f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json"
    item_response = requests.get(item_url)
    story = item_response.json()

    title = story.get('title', 'No title')
    score = story.get('score', 0)
    url = story.get('url', f"https://news.ycombinator.com/item?id={story_id}")
    author = story.get('by', 'unknown')
    time_posted = story.get('time', 0)


    with Session(engine) as session:
        db_story = Story(
            id=story_id,
            title=title,
            url=url,
            score=score,
            by=author,
            time=time_posted
        )

    session.add(db_story)
    session.commit()

    time.sleep(1)