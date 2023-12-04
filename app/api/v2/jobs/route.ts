import { promises as fs } from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get("city");
  const department = searchParams.get("department");
  const status = searchParams.get("status");
  const type = searchParams.get("type");

  const filePath = path.join(process.cwd(), "scraping", "mapped-jobs.json");
  const data = await fs.readFile(filePath, "utf8");
  const jobs = JSON.parse(data);
  let filteredJobs = [];

  if (city) {
    filteredJobs = jobs.filter((job: any) => {
      return job.location.city === city;
    });
  }

  if (department) {
    filteredJobs = jobs.filter((job: any) => {
      return job.department === department;
    });
  }

  if (status) {
    filteredJobs = jobs.filter((job: any) => {
      return job.status === status;
    });
  }

  if (type) {
    filteredJobs = jobs.filter((job: any) => {
      return job.type === type;
    });
  }

  // if no query params are provided, return all jobs
  if (!city && !department && !status && !type) {
    filteredJobs = jobs;
  }

  return Response.json({ jobsLength: filteredJobs.length, jobs: filteredJobs });
}
