#!/bin/sh
# Fetch one job by id: sh get-job.sh <job-id>
if [ -z "$1" ]; then
  echo "usage: sh get-job.sh <job-id>" >&2
  exit 1
fi
curl -s -H "X-API-Key: $JOBVEN_API_KEY" \
  "https://api.jobven.com/v1/public/jobs/$1" | jq '.title'
