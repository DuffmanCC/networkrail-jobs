import { JobInterface } from "@/app/lib/types";
import type NodeCache from "node-cache";
import { FiltersType, JobMappedInterface } from "./types";

export function formatOptions(options: string[]) {
  let uniqueArr = [...new Set(options)];

  uniqueArr = uniqueArr.filter((item) => item);

  uniqueArr.sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));

  return uniqueArr;
}

export function getApplyLink(job: JobInterface) {
  return `https://iebsprodnwrl.opc.oracleoutsourcing.com/OA_HTML/OA.jsp?OAFunc=IRC_VIS_VAC_DISPLAY&p_svid=${job.VACANCY_ID}&p_spid=${job.POSTING_CONTENT_ID}&refsh=0`;
}

export function filterJobs(
  jobs: JobMappedInterface[],
  filters: FiltersType,
  isSalaryActive: boolean
) {
  let filteredJobs = jobs;

  filteredJobs = filteredJobs.filter((job: JobMappedInterface) =>
    !filters.status ? true : filters.status === job.status
  );

  filteredJobs = filteredJobs.filter((job: JobMappedInterface) =>
    !filters.department ? true : filters.department === job.department
  );

  filteredJobs = filteredJobs.filter((job: JobMappedInterface) =>
    !filters.type ? true : filters.type === job.type
  );

  filteredJobs = filteredJobs.filter((job: JobMappedInterface) =>
    !filters.city ? true : filters.city === job.location.city
  );

  filteredJobs = filteredJobs.filter((job: JobMappedInterface) => {
    if (!isSalaryActive) {
      return true;
    }

    if (isSalaryActive && Array.isArray(filters.salary) && job.salary.max) {
      return (
        job.salary.max >= filters.salary[0] &&
        job.salary.max <= filters.salary[1]
      );
    }
  });

  // remove jobs without a valid date
  filteredJobs = filteredJobs.filter((job: JobMappedInterface) => {
    const time = new Date(job.dates.end).getTime();

    if (!isNaN(time)) {
      return true;
    }
  });

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
