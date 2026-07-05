import time
import datetime
from workers.pipeline.run_crew import generate_daily_brief
from backend.app.database import summaries_collection

def run_backfill(days=7):
    print(f"Starting historical backfill for the past {days} days...")
    
    now = int(time.time())
    today = datetime.date.today()
    
    # Loop backwards from 1 day ago to 7 days ago
    for i in range(1, days + 1):
        target_date = today - datetime.timedelta(days=i)
        
        # Check if we already have an article for this date to prevent duplicates
        existing_summary = summaries_collection.find_one({"date": target_date.isoformat()})
        if existing_summary:
            print(f"\n--- Skipping {target_date.strftime('%B %d, %Y')}: Article already exists ---")
            continue
        
        end_time = now - (i * 24 * 60 * 60)
        start_time = now - ((i + 1) * 24 * 60 * 60)
        
        print(f"\n--- Generating Brief for {target_date.strftime('%B %d, %Y')} ---")
        try:
            generate_daily_brief(
                target_date=target_date, 
                start_time=start_time, 
                end_time=end_time
            )
        except Exception as e:
            print(f"Failed to generate brief for {target_date}: {e}")
            
    print("\nBackfill complete!")

if __name__ == "__main__":
    run_backfill(7)
