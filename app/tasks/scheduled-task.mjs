import { promises as fs } from "fs";
import { formatTextWithChatGpt } from "./gpt.mjs";
import {
  fetchDataFromNetworRail,
  getHtmlFromOracle,
  mapJob,
} from "./tools.mjs";

const JSON_FROM_ORACLE_DIR = "./json-from-oracle/";
const JSON_CONTENT_DIR = "./json-content/";

const fetchJobData = async () => {
  try {
    return await fetchDataFromNetworRail();
  } catch (error) {
    console.error("❌ Error fetching job data:", error);
    throw error;
  }
};

const fetchHtmlContent = async (job) => {
  try {
    return await getHtmlFromOracle(job.applyLink);
  } catch (error) {
    console.error(`❌ Error fetching HTML content for job ${job.id}:`, error);
    throw error;
  }
};

const saveHtmlToFile = async (job) => {
  try {
    await fs.readFile(`${JSON_FROM_ORACLE_DIR}${job.id}.json`, "utf8");
    console.log(
      `💾 Job ${job.id} HTML content from Oracle already saved to ${JSON_FROM_ORACLE_DIR}${job.id}.json`
    );
  } catch (error) {
    console.error(`❌ Error saving HTML content for job ${job.id}:`, error);

    const content = await fetchHtmlContent(job);
    await fs.writeFile(`${JSON_FROM_ORACLE_DIR}${job.id}.json`, content);
    console.log(
      `✅ Job ${job.id} HTML content from Oracle saved to ${JSON_FROM_ORACLE_DIR}${job.id}.json`
    );
  }
};

const saveGptContentToFile = async (jobId) => {
  try {
    await fs.readFile(`${JSON_CONTENT_DIR}${jobId}.json`, "utf8");
    console.log(
      `💾 Job ${jobId} formatted content already saved to ${JSON_CONTENT_DIR}${jobId}.json`
    );
  } catch (error) {
    const descriptionJsonStringFromOracle = await fs.readFile(
      `${JSON_FROM_ORACLE_DIR}${jobId}.json`,
      "utf8"
    );

    console.log(`🤞 Creating content for job ${jobId}...`);

    const jobContent = await formatTextWithChatGpt({
      textToFormat: descriptionJsonStringFromOracle,
    });

    if (!jobContent) {
      console.error(`❌ Content for job ${jobId} is not valid JSON`);
      return;
    }

    await fs.writeFile(
      `${JSON_CONTENT_DIR}${jobId}.json`,
      JSON.stringify(jobContent)
    );

    console.log(`✅ Job ${jobId} formatted content saved to ${jobId}.json`);
  }
};

const init = async () => {
  try {
    const response = await fetchJobData();
    const mappedJobs = response.map(mapJob);
    console.log(
      "🚀 ~ file: scheduled-task.mjs:84 ~ init ~ mappedJobs:",
      mappedJobs.length
    );

    await Promise.all(mappedJobs.map(saveHtmlToFile));
    await Promise.all(mappedJobs.map(({ id }) => saveGptContentToFile(id)));
  } catch (error) {
    console.error("❌ An unexpected error occurred:", error);
  }
};

// init();

async function mapJobsWithContent() {
  const response = await fetchJobData();
  const mappedJobs = response.map(mapJob);

  return await Promise.all(
    mappedJobs.map(async (job) => {
      const content = await fs.readFile(
        `${JSON_CONTENT_DIR}${job.id}.json`,
        "utf8"
      );

      // parse content to JSON
      const parsedContent = JSON.parse(JSON.parse(content));

      // check if content is valid JSON
      if (!parsedContent) {
        console.error(`❌ Content for job ${job.id} is not valid JSON`);
        return;
      }

      return {
        ...job,
        content: parsedContent,
      };
    })
  );
}

async function createJobsWithContent() {
  const jobs = await mapJobsWithContent();

  await fs.writeFile(
    "mapped-jobs-with-content.json",
    JSON.stringify(jobs, null, 2)
  );

  console.log("✅ Jobs with content saved to mapped-jobs-with-content.json");
}

createJobsWithContent();

// // schedule job every 10 seconds
// cron.schedule("*/30 * * * * *", () => {
//   init();
// });

// async function countFiles(path) {
//   try {
//     const files = await fs.readdir(path);
//     console.log(`Number of files in ${path}:`, files.length);
//   } catch (err) {
//     console.error("Error reading folder:", err);
//   }
// }

// countFiles(JSON_FROM_ORACLE_DIR);
// countFiles(JSON_CONTENT_DIR);
