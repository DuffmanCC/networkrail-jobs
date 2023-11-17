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
    const filePath = path.join(
      process.cwd(),
      "app",
      "tasks",
      "mapped-jobs-with-content.json"
    );
    const data = await fs.readFile(filePath, "utf8");
    const jobs = JSON.parse(data);
    res.status(200).json(jobs);
  } catch (error) {
    console.log("❌ Failed to fetch data");
    console.log("❌ Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
