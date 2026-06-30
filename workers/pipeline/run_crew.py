from backend.app.database import stories_collection, summaries_collection
from workers.ai_agents.crew import Trendanalysercrew

import time
import datetime
from dotenv import load_dotenv

load_dotenv()

def generate_daily_brief():
    
    interval = int(time.time()) - (24 * 60 * 60)

    query = {
        "time": {"$gte": interval},
        "relevance_score": {"$gte": 7}
    }

    cursor = stories_collection.find(query).sort("relevance_score", -1).limit(10)
    stories = list(cursor)

    if not stories:
        return

    formatted_stories = []
    for story in stories:
        formatted_stories.append(
            f"Title: {story.get("title")} \nURL: {story.get("url")} \nContent:\n{story.get("parsed_content")}\n"
        )

    stories_input = "\n".join(formatted_stories)

    inputs = {
        'current_time': str(datetime.datetime.now()),
        'stories': stories_input
    }

    crew_output = Trendanalysercrew().crew().kickoff(inputs=inputs)

    summary_document = {
        "date": datetime.date.today().isoformat(),
        "summary_title": f"Summary - {datetime.date.today().strftime('%B %d, %Y')}",
        "summary_markdown": str(crew_output),
        "created_at": datetime.datetime.now(datetime.timezone.utc)
    }


    summaries_collection.insert_one(summary_document)
    print("Summary generated and saved successfully.")

if __name__ == "__main__":
    generate_daily_brief()