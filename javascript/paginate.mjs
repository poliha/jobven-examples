// Page through results with cursor pagination.
// Every job returned counts toward your monthly quota, so this stops after
// maxPages pages (default 3; pass a number to change it).
async function fetchJobs(filters = {}, maxPages = 3) {
  const jobs = [];
  let cursor;
  for (let page = 0; page < maxPages; page++) {
    const params = new URLSearchParams({ limit: '100' });
    for (const [key, value] of Object.entries(filters)) {
      for (const item of [value].flat()) params.append(key, item);
    }
    if (cursor) params.set('cursor', cursor);

    const response = await fetch(`https://api.jobven.com/v1/public/jobs?${params}`, {
      headers: { 'X-API-Key': process.env.JOBVEN_API_KEY },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const { data, meta } = await response.json();
    jobs.push(...data);
    console.log(`Progress: ${jobs.length} jobs fetched`);

    cursor = meta.nextCursor;
    if (!meta.hasMore || !cursor) break;
  }
  return jobs;
}

const pages = Number(process.argv[2] ?? 3);
const remoteJobs = await fetchJobs({ 'remoteType[]': ['remote'] }, pages);
console.log(`Done: ${remoteJobs.length} remote jobs`);
