import { JobInterface } from "@/app/lib/types";
import type NodeCache from "node-cache";
import { Filters, JobMappedInterface } from "./types";

export function formatOptions(options: string[]) {
  const uniArr = [...new Set(options)];

  uniArr.sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
  uniArr.splice(uniArr.indexOf(""), 1);

  return uniArr.map((item) => {
    return {
      value: item,
      label: item,
    };
  });
}

export function getApplyLink(job: JobInterface) {
  return `https://iebsprodnwrl.opc.oracleoutsourcing.com/OA_HTML/OA.jsp?OAFunc=IRC_VIS_VAC_DISPLAY&p_svid=${job.VACANCY_ID}&p_spid=${job.POSTING_CONTENT_ID}&refsh=0`;
}

export function mapJobs(job: JobInterface, description: string) {
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
    content: JSON.parse(description) ?? {},
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

export function filterJobs(jobs: JobMappedInterface[], filters: Filters) {
  let filteredJobs = [];

  filteredJobs = jobs.filter((job: JobMappedInterface) =>
    !filters.status ? true : filters.status === job.status
  );

  filteredJobs = filteredJobs.filter((job: JobMappedInterface) =>
    !filters.function ? true : filters.function === job.function
  );

  filteredJobs = filteredJobs.filter((job: JobMappedInterface) =>
    !filters.context ? true : filters.context === job.context
  );

  filteredJobs = filteredJobs.filter((job: JobMappedInterface) =>
    !filters.city ? true : filters.city === job.location.city
  );

  return filteredJobs;
}

export async function fetchDataWithCache(
  cache: NodeCache,
  key: string,
  fetchFunction: () => any,
  ttl: number
) {
  const cachedData = cache.get(key);

  if (cachedData) {
    console.log(`💾 Data fetched from cache with key "${key}"`);
    return cachedData;
  }

  const data = await fetchFunction();
  cache.set(key, data, ttl);
  console.log(`✅ Data cached with key "${key}"`);
  return data;
}
