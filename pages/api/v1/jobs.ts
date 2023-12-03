import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  if (req.method !== "GET") {
    console.log("❌ Only GET method is allowed");
    res.status(500).json({ error: "❌ Only GET method is allowed" });
  }

  try {
    const filePath = path.join(process.cwd(), "scraping", "mapped-jobs.json");
    const data = await fs.readFile(filePath, "utf8");
    const jobs = JSON.parse(data);
    let filteredJobs = [];

    if (req.query.city) {
      filteredJobs = jobs.filter((job: any) => {
        return job.location.city === req.query.city;
      });
    }

    if (req.query.department) {
      filteredJobs = jobs.filter((job: any) => {
        return job.department === req.query.department;
      });
    }

    if (req.query.status) {
      filteredJobs = jobs.filter((job: any) => {
        return job.status === req.query.status;
      });
    }

    if (req.query.type) {
      filteredJobs = jobs.filter((job: any) => {
        return job.type === req.query.type;
      });
    }

    // if no query params are provided, return all jobs
    if (
      !req.query.city &&
      !req.query.department &&
      !req.query.status &&
      !req.query.type
    ) {
      filteredJobs = jobs;
    }

    res
      .status(200)
      .json({ jobsLength: filteredJobs.length, jobs: filteredJobs });
  } catch (error) {
    console.log("❌ Failed to fetch data");
    console.log("❌ Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
