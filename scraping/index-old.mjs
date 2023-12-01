import { promises as fs } from "fs";
import path from "path";
import {
  fetchDataFromNetworRail,
  formatContent,
  getHtmlFromOracle,
  mapJob,
} from "./tools.mjs";

const JSON_FROM_ORACLE_DIR = "./json-from-oracle/";
const JSON_DESCRIPTION = "./description/";

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
  const filePath = path.join(
    process.cwd(),
    "scraping",
    JSON_FROM_ORACLE_DIR,
    `${job.id}.json`
  );

  try {
    await fs.readFile(filePath, "utf8");
    console.log(
      `💾 Job ${job.id} HTML content from Oracle already saved to ${JSON_FROM_ORACLE_DIR}${job.id}.json`
    );
  } catch (error) {
    console.error(`❌ No file content for job ${job.id}, creating...`);

    const content = await fetchHtmlContent(job);

    await fs.writeFile(filePath, content);

    console.log(
      `✅ Job ${job.id} HTML content from Oracle saved to ${JSON_FROM_ORACLE_DIR}${job.id}.json`
    );
  }
};

const saveDescriptionToFile = async (job) => {
  const filePathDescription = path.join(
    process.cwd(),
    "scraping",
    JSON_DESCRIPTION,
    `${job.id}.json`
  );

  const filePathOracle = path.join(
    process.cwd(),
    "scraping",
    JSON_FROM_ORACLE_DIR,
    `${job.id}.json`
  );

  try {
    await fs.readFile(filePathDescription, "utf8");
    console.log(
      `💾 Job ${job.id} formatted content already saved to ${JSON_DESCRIPTION}${job.id}.json`
    );
  } catch (error) {
    const content = await fs.readFile(filePathOracle, "utf8");

    console.log(`🤞 Formating content for job ${job.id}...`);

    const jobContent = await formatContent(content);

    if (!jobContent) {
      console.error(`❌ Content for job ${job.id} is not valid JSON`);
      return;
    }

    await fs.writeFile(filePathDescription, JSON.stringify(jobContent));

    console.log(`✅ Job ${job.id} formatted content saved to ${job.id}.json`);
  }
};

const init = async () => {
  try {
    const response = await fetchJobData();
    const jobs = response.map((job) => {
      return {
        id: job.VACANCY_ID,
        applyLink: `https://iebsprodnwrl.opc.oracleoutsourcing.com/OA_HTML/OA.jsp?OAFunc=IRC_VIS_VAC_DISPLAY&p_svid=${job.VACANCY_ID}&p_spid=${job.POSTING_CONTENT_ID}&refsh=0`,
      };
    });

    await Promise.all(jobs.map(saveHtmlToFile));
    await Promise.all(jobs.map(saveDescriptionToFile));
    const mappedJobs = await Promise.all(response.map(mapJob));

    const filePath = path.join(process.cwd(), "scraping", `mapped-jobs.json`);

    await fs.writeFile(filePath, JSON.stringify(mappedJobs, null, 2));
  } catch (error) {
    console.error("❌ An unexpected error occurred:", error);
  }
};

init();

// async function mapJobsWithContent() {
//   const response = await fetchJobData();
//   const mappedJobs = response.map(mapJob);

//   return await Promise.all(
//     mappedJobs.map(async (job) => {
//       const content = await fs.readFile(
//         `${JSON_CONTENT_DIR}${job.id}.json`,
//         "utf8"
//       );

//       // parse content to JSON
//       const parsedContent = JSON.parse(JSON.parse(content));

//       // check if content is valid JSON
//       if (!parsedContent) {
//         console.error(`❌ Content for job ${job.id} is not valid JSON`);
//         return;
//       }

//       return {
//         ...job,
//         content: parsedContent,
//       };
//     })
//   );
// }

// async function createJobsWithContent() {
//   const jobs = await mapJobsWithContent();

//   await fs.writeFile(
//     "mapped-jobs-with-content.json",
//     JSON.stringify(jobs, null, 2)
//   );

//   console.log("✅ Jobs with content saved to mapped-jobs-with-content.json");
// }

//createJobsWithContent();

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

// const saveGptContentToFile = async (jobId) => {
//   const filePath = path.join(
//     process.cwd(),
//     "scraping",
//     JSON_CONTENT_DIR,
//     `${jobId}.json`
//   );

//   const filePathOracle = path.join(
//     process.cwd(),
//     "scraping",
//     JSON_FROM_ORACLE_DIR,
//     `${jobId}.json`
//   );

//   try {
//     await fs.readFile(filePath, "utf8");
//     console.log(
//       `💾 Job ${jobId} formatted content already saved to ${JSON_CONTENT_DIR}${jobId}.json`
//     );
//   } catch (error) {
//     const descriptionJsonStringFromOracle = await fs.readFile(
//       filePathOracle,
//       "utf8"
//     );

//     console.log(`🤞 Creating content for job ${jobId}...`);

//     const jobContent = await formatTextWithChatGpt({
//       textToFormat: descriptionJsonStringFromOracle,
//     });

//     if (!jobContent) {
//       console.error(`❌ Content for job ${jobId} is not valid JSON`);
//       return;
//     }

//     await fs.writeFile(filePath, JSON.stringify(jobContent));

//     console.log(`✅ Job ${jobId} formatted content saved to ${jobId}.json`);
//   }
// };
