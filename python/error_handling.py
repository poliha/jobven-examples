"""Handle an invalid key, a spent monthly quota and a short burst limit."""
import os
import time

import requests


def fetch_jobs(params, attempts=3):
    for _ in range(attempts):
        response = requests.get(
            "https://api.jobven.com/v1/public/jobs",
            headers={"X-API-Key": os.environ["JOBVEN_API_KEY"]},
            params=params,
            timeout=30,
        )

        if response.status_code == 401:
            raise RuntimeError("Invalid API key")

        if response.status_code == 429:
            body = response.json()
            # The monthly quota is spent: retrying won't help until it resets.
            if body.get("error") == "Quota Exceeded":
                raise RuntimeError("Monthly quota exhausted")
            # A burst limit: wait as long as the body says, then retry.
            time.sleep(body.get("retryAfter", 1))
            continue

        response.raise_for_status()
        return response.json()
    raise RuntimeError("Still rate limited after retries")


if __name__ == "__main__":
    data = fetch_jobs({"limit": 10})
    print(f"Found {len(data['data'])} jobs on this page")
