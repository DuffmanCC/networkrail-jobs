import { formatOptions } from "@/app/lib/tools";
import { JobMappedInterface } from "@/app/lib/types";

export async function GET(req: Request) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v2/jobs`
    );

    const data: { jobsLength: string; jobs: JobMappedInterface[] } =
      await response.json();
    const types: string[] = data.jobs.map((job) => {
      return job.type;
    });

    const result = formatOptions(types);

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "error from the server" });
  }
}
