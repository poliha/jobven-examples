#!/bin/sh
# Page through results with cursor pagination.
# Every job returned counts toward your monthly quota, so this stops after
# MAX_PAGES pages (default 3; pass a number to change it).
MAX_PAGES=${1:-3}
cursor=""
page=0
total=0
while [ "$page" -lt "$MAX_PAGES" ]; do
  url="https://api.jobven.com/v1/public/jobs?limit=100"
  [ -n "$cursor" ] && url="$url&cursor=$cursor"
  body=$(curl -s -H "X-API-Key: $JOBVEN_API_KEY" "$url")
  count=$(echo "$body" | jq '.data | length')
  total=$((total + count))
  echo "Progress: $total jobs fetched"
  [ "$(echo "$body" | jq -r '.meta.hasMore')" = "true" ] || break
  cursor=$(echo "$body" | jq -r '.meta.nextCursor // empty' | jq -sRr @uri)
  [ -n "$cursor" ] || break
  page=$((page + 1))
done
