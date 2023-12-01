"use client";

import { Options } from "@/app/lib/types";
import {
  Button,
  Checkbox,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";
import { useContext } from "react";
import { FilterContext } from "../context/filter-context";

interface Props {
  jobs: [];
  departments: Options;
  statuses: Options;
  types: Options;
  cities: Options;
}

export default function Filters({
  jobs,
  departments,
  statuses,
  types,
  cities,
}: Props) {
  const { filters, setFilters, isSalaryActive, setIsSalaryActive } =
    useContext(FilterContext);

  function handleSelectChange(
    value: string,
    filterKey: "status" | "department" | "type" | "city"
  ) {
    setFilters({ ...filters, [filterKey]: value });
  }

  function clearFilters() {
    setIsSalaryActive(false);

    setFilters({
      status: "",
      type: "",
      city: "",
      department: "",
      salary: [20000, 120000],
    });
  }

  function getNumberOfItems(key: string, value: string) {
    if (key === "city") {
      return jobs.filter((job: any) => job.location.city === value).length;
    }

    return jobs.filter((job: any) => job[key] === value).length;
  }

  type SelectFiltersType = {
    options: Options;
    label: string;
    filterKey: "status" | "department" | "type" | "city";
  }[];

  const mapCities = cities.map((city) => ({
    ...city,
    label: `${city.label} (${getNumberOfItems("city", city.value)})`,
  }));

  const mapDepartments = departments.map((department) => ({
    ...department,
    label: `${department.label} (${getNumberOfItems(
      "department",
      department.value
    )})`,
  }));

  const mapTypes = types.map((type) => ({
    ...type,
    label: `${type.label} (${getNumberOfItems("type", type.value)})`,
  }));

  const mapStatuses = statuses.map((status) => ({
    ...status,
    label: `${status.label} (${getNumberOfItems("status", status.value)})`,
  }));

  const selectFilters: SelectFiltersType = [
    { options: mapStatuses, label: "Status", filterKey: "status" },
    { options: mapDepartments, label: "Department", filterKey: "department" },
    { options: mapTypes, label: "Type", filterKey: "type" },
    { options: mapCities, label: "City", filterKey: "city" },
  ];

  return (
    <>
      <form aria-label="Filter jobs" className="flex flex-col gap-4">
        {selectFilters.map(({ label, options, filterKey }) => (
          <Select
            key={label}
            size="sm"
            label={label}
            placeholder={`Select ${label}`}
            aria-label={`Select ${label}`}
            selectedKeys={filters[filterKey] ? [filters[filterKey]] : []}
            onChange={(e) => {
              handleSelectChange(e.target.value, filterKey);
            }}
          >
            {options.map((el) => (
              <SelectItem key={el.value} value={el.value}>
                {el.label}
              </SelectItem>
            ))}
          </Select>
        ))}

        <Checkbox isSelected={isSalaryActive} onValueChange={setIsSalaryActive}>
          Salary
        </Checkbox>

        <Slider
          label="Price Range"
          isDisabled={!isSalaryActive}
          step={5000}
          minValue={20000}
          maxValue={120000}
          defaultValue={[100, 500]}
          value={filters.salary}
          onChange={(value) => {
            if (Array.isArray(value)) {
              setFilters({ ...filters, salary: value });
            }
          }}
          formatOptions={{
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 0,
          }}
          className="max-w-md"
        />
        <Button onClick={clearFilters}>Clear filters</Button>
      </form>
    </>
  );
}
