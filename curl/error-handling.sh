#!/bin/sh
# Handle an invalid key, a spent monthly quota and a short burst limit.
response=$(curl -s -w "\n%{http_code}" \
  -H "X-API-Key: $JOBVEN_API_KEY" \
  "https://api.jobven.com/v1/public/jobs?limit=10")

status=$(echo "$response" | tail -1)
body=$(echo "$response" | sed '$d')

case "$status" in
  200) echo "$body" | jq '.data | length' ;;
  401) echo "Invalid API key" ;;
  429)
    if echo "$body" | jq -e '.error == "Quota Exceeded"' > /dev/null; then
      echo "Monthly quota exhausted"
    else
      retry=$(echo "$body" | jq -r '.retryAfter // 1')
      echo "Rate limited. Retry in ${retry}s."
    fi
    ;;
  *) echo "API error: $status" ;;
esac
