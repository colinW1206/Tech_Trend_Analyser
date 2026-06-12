from sqlmodel import Session, select
from backend.app.database import engine, Story

import requests
import time

interval = int(time.time()) - (24 * 60 * 60)

with Session(engine) as session:
    story = select(Story).where(Story.time >= interval)
