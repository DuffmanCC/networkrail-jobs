"use client";

import useFilters from "@/app/hooks/useFilters";
import { FilterProps } from "@/app/lib/types";
import {
  Button,
  Checkbox,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";

export default function Filters({
  jobs,
  departments,
  statuses,
  types,
  cities,
}: FilterProps) {
  const {
    filters,
    isSalaryActive,
    handleSelectChange,
    clearFilters,
    selectFilters,
    setIsSalaryActive,
    setFilters,
  } = useFilters({ jobs, departments, statuses, types, cities });

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
              <SelectItem
                key={el.value}
                value={el.value}
                className="text-foreground bg-background"
              >
                {el.label}
              </SelectItem>
            ))}
          </Select>
        ))}

        <Checkbox isSelected={isSalaryActive} onValueChange={setIsSalaryActive}>
          Salary
        </Checkbox>

        <Slider
          label="Salary Range"
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
        />
        <Button onClick={clearFilters}>Clear filters</Button>
      </form>
    </>
  );
}
