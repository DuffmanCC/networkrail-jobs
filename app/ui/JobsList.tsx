"use client";

import { useContext, useMemo } from "react";
import { FilterContext } from "../context/filter-context";
import { filterJobs } from "../lib/tools";
import { JobMappedInterface } from "../lib/types";
import useStore from "../store";
import JobCard from "./JobCard";

interface Props {
  jobs: JobMappedInterface[];
}

export default function JobsList({ jobs }: Props) {
  const { filters, isSalaryActive } = useContext(FilterContext);
  const showMap = useStore((state: any) => state.showMap);

  const filteredJobs = useMemo(() => {
    return filterJobs(jobs, filters, isSalaryActive);
  }, [filters, jobs, isSalaryActive]);

  filteredJobs.sort((a, b) => {
    const aDate = new Date(a.dates.end);
    const bDate = new Date(b.dates.end);

    return bDate.getTime() + aDate.getTime();
  });

  return (
    <div
      className={[
        showMap ? "hidden" : "grid",
        "grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2",
      ].join(" ")}
    >
      {filteredJobs.length !== 0 ? (
        filteredJobs.map((job: JobMappedInterface) => (
          <JobCard job={job} key={job.jobId} />
        ))
      ) : (
        <div className="text-center">No jobs found</div>
      )}
    </div>
  );
}
