import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  JobModel,
  fetchDataFromNetworRail,
  jobExistsInDb,
  mapJob,
  saveJobToMongoDb,
} from "./tools.mjs";
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error(`❌ MongoDB connection error: ${err}`);
  process.exit(-1);
});

export async function init() {
  try {
    const jobs = await fetchDataFromNetworRail();
    let newJobs = 0;

    await Promise.all(
      jobs.map(async (job) => {
        const exists = await jobExistsInDb(JobModel, job.VACANCY_ID);

        if (exists) {
          console.log(`ℹ️ Job ${job.id} already exists`);
          return false;
        }

        const mappedJob = await mapJob(job);
        const savedJob = await saveJobToMongoDb(JobModel, mappedJob);

        if (savedJob) {
          newJobs++;
        }
      })
    );

    console.log(`✅ ${newJobs} new jobs saved to MongoDB`);
  } catch (error) {
    console.error(
      "❌ An unexpected error occurred while saving jobs to MongoDB:",
      error
    );
  } finally {
    await mongoose.disconnect();
  }
}

init();
