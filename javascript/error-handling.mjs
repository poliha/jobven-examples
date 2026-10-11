// Handle an invalid key, a spent monthly quota and a short burst limit.
const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

async function fetchJobs(params, attempts = 3) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const response = await fetch(
      `https://api.jobven.com/v1/public/jobs?${new URLSearchParams(params)}`,
      { headers: { 'X-API-Key': process.env.JOBVEN_API_KEY } },
    );

    if (response.status === 401) {
      throw new Error('Invalid API key');
    }

    if (response.status === 429) {
      const body = await response.json();
      // The monthly quota is spent: retrying won't help until it resets.
      if (body.error === 'Quota Exceeded') {
        throw new Error('Monthly quota exhausted');
      }
      // A burst limit: wait as long as the body says, then retry.
      await sleep(body.retryAfter ?? 1);
      continue;
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  }
  throw new Error('Still rate limited after retries');
}

const { data } = await fetchJobs({ limit: '10' });
console.log(`Found ${data.length} jobs on this page`);
