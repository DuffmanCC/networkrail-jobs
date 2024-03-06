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

async function init() {
  try {
    const jobs = await fetchDataFromNetworRail();

    const results = await Promise.all(
      jobs.map(async (job) => {
        const exists = await jobExistsInDb(JobModel, job.id);
        if (exists) {
          return "Job already exists";
        } else {
          const mappedJob = mapJob(getDescriptionFromOracle, job);
          return saveJobToMongoDb(mappedJob);
        }
      })
    );

    const newJobs = results.filter((result) => result !== "Job already exists");
    console.log(`✅ ${newJobs.length} new jobs saved to MongoDB`);
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
