"""Remote React developer jobs paying at least 100,000. Array filters use bracket notation."""
import os

import requests

response = requests.get(
    "https://api.jobven.com/v1/public/jobs",
    headers={"X-API-Key": os.environ["JOBVEN_API_KEY"]},
    params={
        "q": "react developer",
        "skills[]": ["react", "typescript"],
        "remoteType[]": ["remote"],
        "minSalary": 100000,
        "limit": 20,
    },
    timeout=30,
)
response.raise_for_status()

for job in response.json()["data"]:
    company = job["companies"][0]["name"] if job["companies"] else "Unknown"
    print(f"{job['title']} - {company}")
