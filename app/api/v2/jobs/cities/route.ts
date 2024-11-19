import { Job } from "@/app/db/models/Job";
import dbConnect from "@/app/db/mongo";
import { formatOptions } from "@/app/lib/tools";
import { JobMappedInterface } from "@/app/lib/types";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const jobs: JobMappedInterface[] = await Job.find({
      "dates.end": { $gte: new Date() },
    });

    const cities: string[] = jobs.map((job) => job.location.city);

    const result = formatOptions(cities);

    return Response.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "An error occurred";
    return Response.json({ error: msg }, { status: 500 });
  }
}
