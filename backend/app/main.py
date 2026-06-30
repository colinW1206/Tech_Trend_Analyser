from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.database import summaries_collection

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
    
    cursor = summaries_collection.find().sort("date", -1)
    summaries = list(cursor)

    for summary in summaries:
        summary["id"] = str(summary["_id"])
        del summary["_id"]

    return summaries