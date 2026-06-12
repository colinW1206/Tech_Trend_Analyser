from datetime import datetime, timezone
from typing import Optional
from sqlmodel import Field, Session, SQLModel, create_engine

class Story(SQLModel, table=True):
    id: int = Field(primary_key=True)
    title: str
    url: Optional[str] = None
    score: int
    by: str
    time: int
    parsed_content: Optional[str] = None # For the clean markdown
    relevance_score: Optional[int] = None
    agent_explanation: Optional[str] = None

class Summary(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    date: str = Field(unique=True, index=True)
    summary_title: str
    summary_markdown: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)