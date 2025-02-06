import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  fetchDataFromNetworRail,
  jobExistsInDb,
  mapJob,
  saveJobToMongoDb,
} from "./tools.mjs";

import { Job } from "../app/db/models/Job.js";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export async function init() {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(MONGODB_URI);
      console.log("✅ Connected to MongoDB");
    }

    if (mongoose.connection.readyState === 2) {
      console.log("Waiting for MongoDB connection to complete...");

      // Wait until the connection is complete, or add a timeout if it doesn't connect in a reasonable time
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("MongoDB connection timeout"));
        }, 30000);

        mongoose.connection.once("connected", () => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }

    const jobs = await fetchDataFromNetworRail();
    let newJobs = 0;

    await Promise.allSettled(
      jobs.map(async (job) => {
        const exists = await jobExistsInDb(Job, job.VACANCY_ID);

        if (exists) {
          // console.log(`ℹ️ Job ${job.VACANCY_ID} already exists`);
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
    setTimeout(() => {
      mongoose.disconnect();
    }, 10000);
  }
}

init();
