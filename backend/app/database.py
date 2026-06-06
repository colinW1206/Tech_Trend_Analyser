from datetime import datetime, timezone
from typing import Optional
from sqlmodel import Field, Session, SQLModel, create_engine

class Story(SQLModel, table=True):
    id: int = Field(primary_key=True)
    title: str

class Summary(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)