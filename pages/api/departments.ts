import { formatOptions } from "@/app/lib/tools";
import { JobMappedInterface } from "@/app/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);

    const data: JobMappedInterface[] = await response.json();
    const departments: string[] = data.map((job) => {
      return job.department;
    });

    const result = formatOptions(departments);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "error from the server" });
  }
}
