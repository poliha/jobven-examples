"""Fetch one page of job postings."""
import os

import requests

response = requests.get(
    "https://api.jobven.com/v1/public/jobs",
    headers={"X-API-Key": os.environ["JOBVEN_API_KEY"]},
    params={"limit": 10},
    timeout=30,
)
response.raise_for_status()

data = response.json()
print(f"Found {len(data['data'])} jobs on this page")
for job in data["data"]:
    company = job["companies"][0]["name"] if job["companies"] else "Unknown"
    print(f"- {job['title']} ({company})")
