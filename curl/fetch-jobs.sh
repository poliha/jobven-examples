#!/bin/sh
# Fetch one page of job postings and print each title.
curl -s -H "X-API-Key: $JOBVEN_API_KEY" \
  "https://api.jobven.com/v1/public/jobs?limit=10" | jq -r '.data[] | .title'
