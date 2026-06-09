import os
import requests
from dotenv import load_dotenv

load_dotenv()

JINA_API_KEY = os.getenv("JINA_API_KEY")

HEADERS = {}

if JINA_API_KEY:
    HEADERS["Authorisation"] = f"Bearer {JINA_API_KEY}"

def extract_markdown(url):
    extraction_url = f"https://r.jina.ai/{url}"

    if not url:
        return None

    response = requests.get(extraction_url, headers=HEADERS)

    if response.status_code == 200:
        return response.text
    else:
        print(f"Extraction failed for {url}. Status: {response.status_code}")
        return None
