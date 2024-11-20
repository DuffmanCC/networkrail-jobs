"use client";

import { FilterContext } from "@/app/context/filter-context";
import { filterJobs } from "@/app/lib/tools";
import { JobMappedInterface } from "@/app/lib/types";
import useStore from "@/app/store";
import JobCard from "@/app/ui/JobCard";
import { useContext, useMemo } from "react";

interface Props {
  jobs: JobMappedInterface[];
}

export default function JobsList({ jobs }: Props) {
  const { filters, isSalaryActive } = useContext(FilterContext);
  const showFilters = useStore((state: any) => state.showFilters);

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
    <div
      className={[
        showFilters ? "hidden sm:grid" : "grid",
        "grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2",
      ].join(" ")}
    >
      {filteredJobs.map((job: JobMappedInterface) => (
        <JobCard job={job} key={job._id} />
      ))}
    </div>
  );
}
