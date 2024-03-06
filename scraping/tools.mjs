import * as cheerio from "cheerio";
import { promises as fs } from "fs";
import path from "path";

export function getJobLink(job) {
  return `https://iebsprodnwrl.opc.oracleoutsourcing.com/OA_HTML/OA.jsp?OAFunc=IRC_VIS_VAC_DISPLAY&p_svid=${job.VACANCY_ID}&p_spid=0`;
}

export function fixContent(string) {
  return JSON.parse(string.replace(/’/g, "'"));
}

export async function mapJob(job) {
  const filePath = path.join(
    process.cwd(),
    "scraping",
    "description",
    `${job.VACANCY_ID}.json`
  );
  // get description from file

  let description = "";
  try {
    description = await fs.readFile(filePath, "utf8");
  } catch (error) {
    console.log("❌ Error occurred while reading file here", error);
    description = "";
  }

  const result = {
    jobId: job.VACANCY_ID,
    title: job.DISPLAYED_JOB_TITLE,
    location: {
      city: job.TOWN_OR_CITY,
      postcode: job.POSTAL_CODE,
      lat: job.LATITUDE,
      lng: job.LONGITUDE,
    },
    salary: { min: parseInt(job.MIN_SALARY), max: parseInt(job.MAX_SALARY) },
    description: fixContent(description),
    department: job.FUNCTION,
    dates: {
      start: job.VAC_ADVERTISE_START_DATE,
      end: job.VAC_ADVERTISE_END_DATE,
    },
    status: job.EMPLOYEEMENT_STATUS,
    type: job.VACANCY_CONTEXT,
    applyLink: `https://iebsprodnwrl.opc.oracleoutsourcing.com/OA_HTML/OA.jsp?OAFunc=IRC_VIS_VAC_DISPLAY&p_svid=${job.VACANCY_ID}&p_spid=${job.POSTING_CONTENT_ID}&refsh=0`,
  };

  return result;
}

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

export function innerJoin(arr1, arr2, key) {
  const stack = [];

  for (let i = 0; i < arr1.length; i++) {
    const obj2 = arr2.find((el) => el[key] === arr1[i][key]);
    const result = { ...arr1[i], ...obj2 };

    stack.push(result);
  }

  return stack;
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

export async function parseJob(getDescriptionFromOracle, job) {
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
