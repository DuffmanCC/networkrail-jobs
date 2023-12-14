import { FilterProps, JobMappedInterface, Options } from "@/app/lib/types";
import { useContext, useMemo } from "react";
import { FilterContext } from "../context/filter-context";
import { filterJobs } from "../lib/tools";

export default function useFilters({
  cities,
  departments,
  statuses,
  types,
  jobs,
}: FilterProps) {
  const { filters, setFilters, isSalaryActive, setIsSalaryActive } =
    useContext(FilterContext);

  const filteredJobs = useMemo(() => {
    return filterJobs(jobs, filters, isSalaryActive);
  }, [filters, jobs, isSalaryActive]);

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

  function getNumberOfItems(
    key: string,
    value: string,
    jobs: JobMappedInterface[]
  ) {
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

  const mapCities = cities
    .map((city) => ({
      value: city,
      label: `${city} (${getNumberOfItems("city", city, filteredJobs)})`,
    }))
    .filter((el) => !/\(0\)/.test(el.label));

  const mapDepartments = departments
    .map((department) => ({
      value: department,
      label: `${department} (${getNumberOfItems(
        "department",
        department,
        filteredJobs
      )})`,
    }))
    .filter((el) => !/\(0\)/.test(el.label));

  const mapTypes = types
    .map((type) => ({
      value: type,
      label: `${type} (${getNumberOfItems("type", type, filteredJobs)})`,
    }))
    .filter((el) => !/\(0\)/.test(el.label));

  const mapStatuses = statuses
    .map((status) => ({
      value: status,
      label: `${status} (${getNumberOfItems("status", status, filteredJobs)})`,
    }))
    .filter((el) => !/\(0\)/.test(el.label));

  const selectFilters: SelectFiltersType = [
    { options: mapStatuses, label: "Status", filterKey: "status" },
    { options: mapDepartments, label: "Department", filterKey: "department" },
    { options: mapTypes, label: "Type", filterKey: "type" },
    { options: mapCities, label: "City", filterKey: "city" },
  ];

  return {
    filters,
    isSalaryActive,
    handleSelectChange,
    clearFilters,
    selectFilters,
    setIsSalaryActive,
    setFilters,
  };
}
