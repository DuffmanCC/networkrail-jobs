import axios from "axios";
import * as cheerio from "cheerio";

export function mapJob(job) {
  const result = {
    id: job.VACANCY_ID,
    title: job.DISPLAYED_JOB_TITLE,
    location: {
      city: job.TOWN_OR_CITY,
      postcode: job.POSTAL_CODE,
      lat: job.LATITUDE,
      lng: job.LONGITUDE,
    },
    salary: { min: job.MIN_SALARY, max: job.MAX_SALARY },
    function: job.FUNCTION,
    content: job.DEPARTMENT_AND_HOW_IT_RELATES_TO_THE_ROLE,
    shortDescription: job.DEPARTMENT_AND_HOW_IT_RELATES_TO_THE_ROLE,
    dates: {
      start: job.VAC_ADVERTISE_START_DATE,
      end: job.VAC_ADVERTISE_END_DATE,
    },
    status: job.EMPLOYEEMENT_STATUS,
    context: job.VACANCY_CONTEXT,
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

async function fetchData(url) {
  console.log("🤟 Scraping data...");
  // make http call to url
  let response = await axios(url).catch((err) => console.log(err));

  if (response.status !== 200) {
    console.log("❌ Error occurred while fetching data");
    return;
  }

  return response;
}

export async function getHtmlFromOracle(url) {
  let res = await fetchData(url);

  if (!res.data) {
    console.log("❌ Invalid data Obj");
    throw new Error("Invalid data Obj");
  }

  const html = res.data;
  // mount html page to the root element
  const $ = cheerio.load(html);

  const dataObj = {};
  const nodes = $(
    "#oafcontent #p_SwanPageLayout .x7m .x7m table table tbody > tr"
  );

  let counter = 1;

  nodes.each(function () {
    const tds = $(this).find("td");
    const content = tds.text();

    if (content) {
      dataObj["line-" + counter] = content;
      counter++;
    }
  });

  if (Object.keys(dataObj).length === 0) return "";

  return JSON.stringify(dataObj);
}
