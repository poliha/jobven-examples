// Fetch one page of job postings. Node 18+ (built-in fetch).
const response = await fetch('https://api.jobven.com/v1/public/jobs?limit=10', {
  headers: { 'X-API-Key': process.env.JOBVEN_API_KEY },
});

if (!response.ok) {
  throw new Error(`API error: ${response.status}`);
}

const { data: jobs } = await response.json();
console.log(`Found ${jobs.length} jobs on this page`);
for (const job of jobs) {
  console.log(`- ${job.title} (${job.companies[0]?.name ?? 'Unknown'})`);
}
