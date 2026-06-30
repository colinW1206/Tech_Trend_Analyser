import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise ValueError("No MONGODB_URI found in .env file.")

client = MongoClient(MONGODB_URI)

db = client["tech_trend_db"]

stories_collection = db["stories"]
summaries_collection = db["summaries"]