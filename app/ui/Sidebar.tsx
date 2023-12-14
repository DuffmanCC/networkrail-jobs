"use client";

import { Card } from "@nextui-org/react";
import { useContext, useMemo } from "react";
import { FilterContext } from "../context/filter-context";
import { filterJobs } from "../lib/tools";
import useStore from "../store";
import Filters from "./Filters";

interface Props {
  id: string;
  jobs: any;
  departments: { value: string; label: string }[];
  statuses: { value: string; label: string }[];
  types: { value: string; label: string }[];
  cities: { value: string; label: string }[];
}

export default function Sidebar({
  id,
  jobs,
  departments,
  statuses,
  types,
  cities,
}: Props) {
  const showFilters = useStore((state: any) => state.showFilters);

  const { filters, setFilters, isSalaryActive, setIsSalaryActive } =
    useContext(FilterContext);

  const filteredJobs = useMemo(() => {
    return filterJobs(jobs, filters, isSalaryActive);
  }, [filters, jobs, isSalaryActive]);

  filteredJobs.sort((a, b) => {
    const aDate = new Date(a.dates.end);
    const bDate = new Date(b.dates.end);

    return bDate.getTime() - aDate.getTime();
  });

  return (
    <Card
      id={id}
      className={[
        !showFilters ? "hidden " : "",
        "bg-slate-200 dark:bg-slate-800",
      ].join(" ")}
      radius="sm"
      shadow="none"
    >
      <aside className="" aria-label="Sidebar">
        <div className="p-3 flex flex-col gap-3">
          <Filters
            jobs={jobs}
            departments={departments}
            statuses={statuses}
            types={types}
            cities={cities}
          />

          <div className="flex justify-center items-center font-bold">
            {filteredJobs.length !== 0
              ? filteredJobs.length === 1
                ? "1 job found"
                : `${filteredJobs.length} jobs found`
              : "No jobs found"}
          </div>
        </div>
      </aside>
    </Card>
  );
}
