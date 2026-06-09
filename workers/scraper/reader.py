import requests

HEADERS = {
    "Authorization": "Bearer [API KEY FROM ENV FILE]"
}

def extractMarkdown(url):

    extraction_url = "https://r.jina.ai/https://www.example.com"

    response = requests.get(extraction_url, headers=HEADERS)

    print(response.text)

    return response.text