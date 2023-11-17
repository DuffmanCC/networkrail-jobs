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
  const { filters } = useContext(FilterContext);

  const filteredJobs = useMemo(() => {
    return filterJobs(jobs, filters);
  }, [filters, jobs]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {filteredJobs.length !== 0 ? (
        filteredJobs.map((job: JobMappedInterface) => (
          <JobCard job={job} key={job.id} />
        ))
      ) : (
        <div className="text-center">No jobs found</div>
      )}
    </div>
  );
}
