from backend.app.database import stories_collection

from dotenv import load_dotenv
from litellm import completion

import requests
import time
import os
import json

load_dotenv()

PROMPT = """
    You are evaluating a Hacker News article for the daily
    news brief.

    Please output a JSON object with these exact two keys:
    - "relevance_score": integer from 1-10
    - "score_explanation": a concise explanation of the score
"""

interval = int(time.time()) - (24 * 60 * 60)

query = {
    "time": {"$gte": interval}
}

cursor = stories_collection.find(query)
recent_stories = list(cursor)

for story in recent_stories:
    if story.get("parsed_content"):
        payload = f"Article Content:\n{story.get("parsed_content")}"

        response = completion(
            model=os.getenv("OPENAI_MODEL_NAME"),

            messages=[
                {"role": "system", "content": PROMPT},
                {"role": "user", "content": payload},
            ],

            response_format={"type": "json_object"}
        )

        output = response.choices[0].message.content

        try:
            data = json.loads(output)
            relevance_score = data.get("relevance_score")
            score_explanation = data.get("score_explanation")

            print(f"Scored {story.get("title")}: {relevance_score}/10 \n {score_explanation}")

            stories_collection.update_one(
                {"_id": story["_id"]},
                {"$set": {
                    "relevance_score": relevance_score,
                    "score_explanation": score_explanation
                }}
            )

        except json.JSONDecodeError:
            print("Did not get valid JSON object.")
