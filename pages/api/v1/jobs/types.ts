import { formatOptions } from "@/app/lib/tools";
import { JobMappedInterface } from "@/app/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs`
    );

    const data: { jobsLength: string; jobs: JobMappedInterface[] } =
      await response.json();
    const types: string[] = data.jobs.map((job) => {
      return job.type;
    });

    const result = formatOptions(types);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "error from the server" });
  }
}
