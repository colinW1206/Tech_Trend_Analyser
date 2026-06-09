from sqlmodel import Session
from backend.app.database import engine, Story
from .reader import extract_markdown

import requests
import time

top_stories_url = "https://hacker-news.firebaseio.com/v0/topstories.json"
response = requests.get(top_stories_url)
story_ids = response.json()

top_10_ids = story_ids[:3]

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

        existing_story = session.get(Story, story_id)

        if not existing_story:
            original_url = story.get('url')
            parsed_content = None

            if original_url:
                parsed_content = extract_markdown(original_url)
                time.sleep(0.5)

            db_story = Story(
                id=story_id,
                title=title,
                url=url,
                score=score,
                by=author,
                time=time_posted,
                parsed_content=parsed_content
            )

            session.add(db_story)
            session.commit()
            print(f"Added new story: {title}.")

        else:
            existing_story.score = score
            session.add(existing_story)
            session.commit()
            print(f"Updated score for: {title}.")

    time.sleep(1)