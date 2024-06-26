"use client";

import { useContext, useMemo } from "react";
import { FilterContext } from "../context/filter-context";
import { filterJobs } from "../lib/tools";
import { JobMappedInterface } from "../lib/types";
import JobCard from "./JobCard";

interface Props {
  jobs: JobMappedInterface[];
}

export default function JobsList({ jobs }: Props) {
  const { filters, isSalaryActive } = useContext(FilterContext);

  const filteredJobs = useMemo(() => {
    return filterJobs(jobs, filters, isSalaryActive);
  }, [filters, jobs, isSalaryActive]);

  filteredJobs.sort((a, b) => {
    const aDate = new Date(a.dates.end);
    const bDate = new Date(b.dates.end);

    return aDate.getTime() - bDate.getTime();
  });

  if (filteredJobs.length === 0) {
    return (
      <div className="font-bold flex justify-center items-center h-full">
        No jobs found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
      {filteredJobs.map((job: JobMappedInterface) => (
        <JobCard job={job} key={job.jobId} />
      ))}
    </div>
  );
}
