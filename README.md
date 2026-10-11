# Jobven API examples

Runnable examples for the [Jobven API](https://jobven.com): job postings collected directly from
employer career pages, as structured JSON. Each script is small and standalone, so you can copy the
one you need.

Full documentation: [jobven.com/docs](https://jobven.com/docs/getting-started).

## Setup

Get an API key from the [Jobven dashboard](https://jobven.com/signup) (there is a free tier), then:

```bash
export JOBVEN_API_KEY="your_api_key"
```

Every request sends the key in the `X-API-Key` header.

## Examples

| Task | Python | JavaScript (Node 18+) | curl |
|---|---|---|---|
| Fetch a page of jobs | [`python/fetch_jobs.py`](python/fetch_jobs.py) | [`javascript/fetch-jobs.mjs`](javascript/fetch-jobs.mjs) | [`curl/fetch-jobs.sh`](curl/fetch-jobs.sh) |
| Filter by text, skills, remote type and salary | [`python/filter_jobs.py`](python/filter_jobs.py) | [`javascript/filter-jobs.mjs`](javascript/filter-jobs.mjs) | [`curl/filter-jobs.sh`](curl/filter-jobs.sh) |
| Page through results with a cursor | [`python/paginate.py`](python/paginate.py) | [`javascript/paginate.mjs`](javascript/paginate.mjs) | [`curl/paginate.sh`](curl/paginate.sh) |
| Fetch one job by id | [`python/get_job.py`](python/get_job.py) | [`javascript/get-job.mjs`](javascript/get-job.mjs) | [`curl/get-job.sh`](curl/get-job.sh) |
| Handle invalid keys and rate limits | [`python/error_handling.py`](python/error_handling.py) | [`javascript/error-handling.mjs`](javascript/error-handling.mjs) | [`curl/error-handling.sh`](curl/error-handling.sh) |

### Python

```bash
pip install -r python/requirements.txt
python python/fetch_jobs.py
python python/get_job.py <job-id>
```

### JavaScript

No dependencies; uses the built-in `fetch`.

```bash
node javascript/fetch-jobs.mjs
node javascript/get-job.mjs <job-id>
```

### curl

The scripts pipe responses through [`jq`](https://jqlang.github.io/jq/).

```bash
sh curl/fetch-jobs.sh
sh curl/get-job.sh <job-id>
```

## Notes

- **Quota.** Every job returned counts toward your monthly allowance. The pagination examples stop
  after 3 pages by default; pass a number to change it (`python python/paginate.py 10`).
- **Array filters** use bracket notation: `skills[]=react&skills[]=typescript`. In a raw URL the
  brackets are encoded (`skills%5B%5D`).
- **Rate limits.** A `429` with `"error": "Quota Exceeded"` means the monthly quota is spent, so
  retrying will not help until it resets. Any other `429` is a short burst limit: wait the
  `retryAfter` seconds from the response body and retry.

Every filter and response field is listed in the [Jobs reference](https://jobven.com/docs/reference/jobs).

## License

MIT
