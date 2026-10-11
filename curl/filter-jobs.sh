#!/bin/sh
# Remote React developer jobs paying at least 100,000.
# Array filters use bracket notation, URL-encoded: skills%5B%5D is skills[].
curl -s -H "X-API-Key: $JOBVEN_API_KEY" \
  "https://api.jobven.com/v1/public/jobs?q=react%20developer&skills%5B%5D=react&skills%5B%5D=typescript&remoteType%5B%5D=remote&minSalary=100000&limit=20" \
  | jq -r '.data[] | "\(.title) - \(.companies[0].name // "Unknown")"'
