"""Page through results with cursor pagination.

Every job returned counts toward your monthly quota, so this stops after
max_pages pages (default 3; pass a number to change it).
"""
import os
import sys

import requests


def fetch_jobs(filters=None, max_pages=3):
    jobs = []
    cursor = None
    for _ in range(max_pages):
        params = {**(filters or {}), "limit": 100}
        if cursor:
            params["cursor"] = cursor

        response = requests.get(
            "https://api.jobven.com/v1/public/jobs",
            headers={"X-API-Key": os.environ["JOBVEN_API_KEY"]},
            params=params,
            timeout=30,
        )
        response.raise_for_status()

        data = response.json()
        jobs.extend(data["data"])
        print(f"Progress: {len(jobs)} jobs fetched")

        cursor = data["meta"].get("nextCursor")
        if not data["meta"].get("hasMore") or not cursor:
            break
    return jobs


if __name__ == "__main__":
    pages = int(sys.argv[1]) if len(sys.argv) > 1 else 3
    remote_jobs = fetch_jobs({"remoteType[]": ["remote"]}, max_pages=pages)
    print(f"Done: {len(remote_jobs)} remote jobs")
