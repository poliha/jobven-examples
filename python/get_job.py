"""Fetch one job by id: python get_job.py <job-id>"""
import os
import sys

import requests

if len(sys.argv) < 2:
    sys.exit("usage: python get_job.py <job-id>")

response = requests.get(
    f"https://api.jobven.com/v1/public/jobs/{sys.argv[1]}",
    headers={"X-API-Key": os.environ["JOBVEN_API_KEY"]},
    timeout=30,
)

if response.status_code == 404:
    print("Job not found")
else:
    response.raise_for_status()
    job = response.json()
    print(job["title"])
