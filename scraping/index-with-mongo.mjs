import dotenv from "dotenv";
import mongoose, { Schema, model } from "mongoose";
import { fetchDataFromNetworRail, mapJob } from "./tools.mjs";
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

const jobSchema = new Schema({
  jobId: String,
  title: String,
  location: {
    city: String,
    postcode: String,
    lat: Number,
    lng: Number,
  },
  salary: {
    min: Number,
    max: Number,
  },
  description: String,
  department: String,
  dates: {
    start: Date,
    end: Date,
  },
  status: String,
  type: String,
});

const Job = model("Job", jobSchema);

const jobExistsInDb = async (jobModel, jobId) => {
  // Check if a job with the same unique identifier already exists
  const existingJob = await jobModel.findOne({ id: jobId });

  return Boolean(existingJob);
};

const saveJobToMongoDb = async (job) => {
  const url = `http://localhost:3000/api/v2/job`;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the response as JSON
    })
    .then((data) => {})
    .catch((error) => {
      // Handle errors that occurred during the request
      console.error("There was a problem with the request:", error);
    });
};

async function init() {
  try {
    const jobs = await fetchDataFromNetworRail();

    const results = await Promise.all(
      jobs.map(async (job) => {
        const exists = await jobExistsInDb(Job, job.id);
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
    process.exit(0);
  }
}

init();
