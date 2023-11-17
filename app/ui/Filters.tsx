"use client";

/*
 * TODO:
 * https://www.jussivirtanen.fi/writing/styling-react-select-with-tailwind
 */

import { Options, SelectOption } from "@/app/lib/types";
import { useContext } from "react";
import Select, { SingleValue } from "react-select";
import { FilterContext } from "../context/filter-context";

interface Props {
  jobs: [];
  jobFunctions: Options;
  jobStatuses: Options;
  jobContexts: Options;
  jobCities: Options;
}

interface Filters {
  "job-status"?: SelectOption;
  "job-function"?: SelectOption;
  "job-context"?: SelectOption;
  "job-city"?: SelectOption;
}

export default function Filters({
  jobFunctions,
  jobStatuses,
  jobContexts,
  jobCities,
}: Props) {
  const { filters, setFilters } = useContext(FilterContext);

  function handleChangeFilters(
    newValue: SingleValue<SelectOption>,
    action: any
  ) {
    const query = newValue?.value;

    if (!query) return;

    const filterName = action.name.split("-")[1];

    setFilters({
      ...filters,
      [filterName]: query,
    });
  }

  function clearFilters(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setFilters({});
  }

  return (
    <form aria-label="Filter jobs" className="flex flex-col gap-4">
      <Select
        options={jobStatuses}
        onChange={handleChangeFilters}
        id="job-status"
        instanceId="job-status"
        name="job-status"
      />

      <Select
        options={jobFunctions}
        onChange={handleChangeFilters}
        id="job-function"
        instanceId="job-function"
        name="job-function"
        classNames={{
          option: () => "text-brand-blue bg-white px-2 py-1",
          control: () => "border border-gray-300 rounded-md",
        }}
      />

      <Select
        options={jobContexts}
        onChange={handleChangeFilters}
        id="job-context"
        instanceId="job-context"
        name="job-context"
      />

      <Select
        options={jobCities}
        onChange={handleChangeFilters}
        id="job-city"
        instanceId="job-city"
        name="job-city"
      />

      <button
        className="px-4 py-2 border rounded-lg bg-white"
        onClick={clearFilters}
      >
        Clear filters
      </button>
    </form>
  );
}
