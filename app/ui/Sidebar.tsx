"use client";

import { Card } from "@nextui-org/react";
import Filters from "./Filters";

interface Props {
  jobs: any;
  departments: { value: string; label: string }[];
  statuses: { value: string; label: string }[];
  types: { value: string; label: string }[];
  cities: { value: string; label: string }[];
}

export default function Sidebar({
  jobs,
  departments,
  statuses,
  types,
  cities,
}: Props) {
  // const showFilters = useStore((state: any) => state.showFilters);
  // const classes = showFilters ? "relative" : "hidden";

  return (
    <Card className="">
      <aside className="h-full w-full" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto w-full">
          <Filters
            jobs={jobs}
            departments={departments}
            statuses={statuses}
            types={types}
            cities={cities}
          />

          <div>{jobs.length}</div>
        </div>
      </aside>
    </Card>
  );
}
