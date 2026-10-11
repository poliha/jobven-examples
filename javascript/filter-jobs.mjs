// Remote React developer jobs paying at least 100,000. Array filters use bracket notation.
const params = new URLSearchParams({
  q: 'react developer',
  minSalary: '100000',
  limit: '20',
});
params.append('skills[]', 'react');
params.append('skills[]', 'typescript');
params.append('remoteType[]', 'remote');

const response = await fetch(`https://api.jobven.com/v1/public/jobs?${params}`, {
  headers: { 'X-API-Key': process.env.JOBVEN_API_KEY },
});

if (!response.ok) {
  throw new Error(`API error: ${response.status}`);
}

const { data: jobs } = await response.json();
for (const job of jobs) {
  console.log(`${job.title} - ${job.companies[0]?.name ?? 'Unknown'}`);
}
