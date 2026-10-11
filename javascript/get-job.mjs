// Fetch one job by id: node get-job.mjs <job-id>
const jobId = process.argv[2];
if (!jobId) {
  console.error('usage: node get-job.mjs <job-id>');
  process.exit(1);
}

const response = await fetch(`https://api.jobven.com/v1/public/jobs/${jobId}`, {
  headers: { 'X-API-Key': process.env.JOBVEN_API_KEY },
});

if (response.status === 404) {
  console.log('Job not found');
} else if (!response.ok) {
  throw new Error(`API error: ${response.status}`);
} else {
  const job = await response.json();
  console.log(job.title);
}
