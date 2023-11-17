import { JobMappedInterface } from "@/app/lib/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JobMappedInterface | { error: string }>
) {
  const {
    query: { id },
  } = req;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);

  const jobs: JobMappedInterface[] = await response.json();
  const job = jobs?.find((job) => {
    return job.id === id;
  });

  if (job) {
    res.status(200).json(job);
  }

  res.status(404).json({ error: `Job ${id} not found` });
}
