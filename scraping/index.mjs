import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  fetchDataFromNetworRail,
  jobExistsInDb,
  mapJob,
  saveJobToMongoDb,
} from "./tools.mjs";

import { Job } from "@/app/db/models/Job.js";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export async function init() {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("error", (err) => {
    console.error(`❌ MongoDB connection error: ${err}`);
    process.exit(-1);
  });

  try {
    const jobs = await fetchDataFromNetworRail();
    let newJobs = 0;

    await Promise.allSettled(
      jobs.map(async (job) => {
        const exists = await jobExistsInDb(Job, job.VACANCY_ID);

        if (exists) {
          console.log(`ℹ️ Job ${job.VACANCY_ID} already exists`);
          return false;
        }

        const mappedJob = await mapJob(job);
        const savedJob = await saveJobToMongoDb(Job, mappedJob);

        if (savedJob) {
          newJobs++;
        }

        return Promise.resolve(true);
      })
    );

    console.log(`✅ ${newJobs} new jobs saved to MongoDB`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : error;
    console.error(
      "❌ An unexpected error occurred while saving jobs to MongoDB:",
      msg
    );
  } finally {
    /**
     * An unexpected error occurred while saving jobs to MongoDB: MongoExpiredSessionError:
     * Cannot use a session that has ended at applySession
     *
     * The error you're seeing above is likely due to the asynchronous
     * nature of your code. The mongoose.disconnect() in the finally
     * block might be executing before all the promises inside the Promise.all have resolved.
     * Use Promise.allSettled instead of Promise.all to ensure that the finally block
     * is executed after all promises have resolved or rejected.
     */
    await mongoose.disconnect();
  }
}

init();
