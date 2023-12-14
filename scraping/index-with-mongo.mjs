import { fetchDataFromNetworRail, mappJob2 } from "./tools.mjs";

const saveJobToMongoDb = async (job) => {
  // check if job already exists
  const response = await fetch(`http://localhost:3000/api/v2/job/${job.jobId}`);

  const data = await response.json();

  // if job already exists, return
  if (data.success) return "Job already exists";

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

const init = async () => {
  try {
    const jobs = await fetchDataFromNetworRail();
    const mappedJobs = await Promise.all(jobs.map(mappJob2));
    const results = await Promise.all(mappedJobs.map(saveJobToMongoDb));
    const newJobs = results.filter((result) => result !== "Job already exists");
    console.log(`✅ ${newJobs.length} new jobs saved to MongoDB`);
  } catch (error) {
    console.error(
      "❌ An unexpected error occurred while saving jobs to MongoDB:",
      error
    );
  }
};

init();
