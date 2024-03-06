import * as cheerio from "cheerio";
import { Schema, model } from "mongoose";

export async function fetchDataFromNetworRail() {
  const response = await fetch(
    "https://www.networkrail.co.uk/wp-content/themes/sage-10/resources/careers.json"
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.career;
}

export async function fetchData(url) {
  console.log("🤟 Scraping data...");

  const response = await fetch(url);

  if (!response.ok) {
    console.log("❌ Error occurred while fetching data");
    return;
  }

  let data = await response.arrayBuffer();

  const decoder = new TextDecoder("ISO-8859-1");
  const text = decoder.decode(data);

  return { data: text };
}

export async function getHtmlFromOracle(fetchData, url) {
  let res = await fetchData(url);

  if (!res.data) {
    console.log("❌ Invalid data Obj");
    throw new Error("Invalid data Obj");
  }

  const rawHtml = res.data;
  // let decodedHTML = he.decode(rawHtml);
  // mount html page to the root element
  const $ = cheerio.load(rawHtml);

  const dataObj = {};
  const nodes = $(
    "#oafcontent #p_SwanPageLayout .x7m .x7m table table tbody > tr"
  );

  let counter = 1;

  nodes.each(function () {
    const tds = $(this).find("td");
    const content = tds.text().trim();

    const cleanedText = content.replace(/\s+/g, " ").replace(/&nbsp;/g, " ");

    if (cleanedText) {
      dataObj["line-" + counter] = cleanedText;
      counter++;
    }
  });

  if (Object.keys(dataObj).length === 0) return "";

  return JSON.stringify(dataObj);
}

export async function formatContent(string) {
  const dataObj = JSON.parse(string);

  return dataObj["line-9"];
}

export async function getDescriptionFromOracle(
  getHtmlFromOracle,
  formatContent,
  job
) {
  const url = `https://iebsprodnwrl.opc.oracleoutsourcing.com/OA_HTML/OA.jsp?OAFunc=IRC_VIS_VAC_DISPLAY&p_svid=${job.VACANCY_ID}&p_spid=0`;
  // fetch to oracle page
  let string = "";

  try {
    string = await getHtmlFromOracle(url);
  } catch (error) {
    return "";
  }

  try {
    return await formatContent(string);
  } catch (error) {
    return "";
  }
}

export async function mapJob(getDescriptionFromOracle, job) {
  const description = await getDescriptionFromOracle(job);

  return {
    jobId: job.VACANCY_ID,
    title: job.DISPLAYED_JOB_TITLE,
    location: {
      city: job.TOWN_OR_CITY,
      postcode: job.POSTAL_CODE,
      lat: job.LATITUDE,
      lng: job.LONGITUDE,
    },
    salary: { min: parseInt(job.MIN_SALARY), max: parseInt(job.MAX_SALARY) },
    description: description,
    department: job.FUNCTION,
    dates: {
      start: job.VAC_ADVERTISE_START_DATE,
      end: job.VAC_ADVERTISE_END_DATE,
    },
    status: job.EMPLOYEEMENT_STATUS,
    type: job.VACANCY_CONTEXT,
    applyLink: `https://iebsprodnwrl.opc.oracleoutsourcing.com/OA_HTML/OA.jsp?OAFunc=IRC_VIS_VAC_DISPLAY&p_svid=${job.VACANCY_ID}&p_spid=0`,
  };
}

export async function saveJobToMongoDb(job) {
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
}

export async function jobExistsInDb(jobModel, jobId) {
  // Check if a job with the same unique identifier already exists
  const existingJob = await jobModel.findOne({ id: jobId });

  return Boolean(existingJob);
}

export const jobSchema = new Schema({
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

export const JobModel = model("Job", jobSchema);
