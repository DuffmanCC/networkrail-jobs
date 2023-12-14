import { Job } from "@/app/db/models/Job";
import dbConnect from "@/app/db/mongo";
import { JobMappedInterface } from "@/app/lib/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get("city");
  const department = searchParams.get("department");
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  console.log("🚀 ~ file: route.ts:14 ~ GET ~ to:", to);

  await dbConnect();

  try {
    const jobs: JobMappedInterface[] = await Job.find({});

    let filteredJobs = jobs;

    if (city) {
      filteredJobs = filteredJobs.filter((job) => job.location.city === city);
    }

    if (department) {
      filteredJobs = filteredJobs.filter(
        (job) => job.department === department
      );
    }

    if (status) {
      filteredJobs = filteredJobs.filter((job) => job.status === status);
    }

    if (type) {
      filteredJobs = filteredJobs.filter((job) => job.type === type);
    }

    if (from) {
      const [day, month, year] = from.split("-");

      const fromDate = new Date(`${year}-${month}-${day}`);

      filteredJobs = filteredJobs.filter((job) => job.dates.start >= fromDate);
    }

    if (to) {
      const [day, month, year] = to.split("-");

      const toDate = new Date(`${year}-${month}-${day}`);

      filteredJobs = filteredJobs.filter((job) => job.dates.end <= toDate);
    }

    return Response.json({
      success: true,
      jobsCount: filteredJobs.length,
      filterBy: {
        city,
        department,
        status,
        type,
        from,
        to,
      },
      data: filteredJobs,
    });
  } catch (error) {
    return Response.json({ error: "error from the server" });
  }
}
