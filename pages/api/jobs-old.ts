import cache from "@/app/lib/cache";
import { formatTextWithChatGpt } from "@/app/lib/chat-gpt-api";
import { CACHE_TIME_REQUEST, MAX_TOKENS } from "@/app/lib/constants";
import { getHtmlFromOracle } from "@/app/lib/oracle-fetch";
import { fetchDataFromNetworRail } from "@/app/lib/requests";
import { fetchDataWithCache, getApplyLink, mapJobs } from "@/app/lib/tools";
import { JobInterface } from "@/app/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | { error: string }>
) {
  if (req.method !== "GET") {
    console.log("❌ Only GET method is allowed");
    res.status(500).json({ error: "❌ Only GET method is allowed" });
  }

  try {
    const jobs = await fetchDataWithCache(
      cache,
      "jobs",
      fetchDataFromNetworRail,
      CACHE_TIME_REQUEST
    );

    const mappedJobs = await Promise.all(
      jobs.slice(0, 3).map(async (job: JobInterface) => {
        const applyLink = getApplyLink(job);

        const descriptionJsonStringFromOracle = await fetchDataWithCache(
          cache,
          `job-${job.VACANCY_ID}-oracle`,
          () => getHtmlFromOracle(applyLink),
          CACHE_TIME_REQUEST
        );

        const jobContent = await fetchDataWithCache(
          cache,
          `job-${job.VACANCY_ID}-chatgpt`,
          () =>
            formatTextWithChatGpt({
              textToFormat: descriptionJsonStringFromOracle,
              maxTokens: MAX_TOKENS,
            }),
          CACHE_TIME_REQUEST
        );

        return mapJobs(job, jobContent);
      })
    );

    if (!mappedJobs) return;

    res.status(200).json(mappedJobs);
  } catch (error) {
    console.log("❌ Failed to fetch data");
    console.log("❌ Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
