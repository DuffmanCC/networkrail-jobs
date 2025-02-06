"use client";

import { FiltersType } from "@/app/lib/types";
import { createContext, useState } from "react";

const initialFilters = {
  status: "",
  type: "",
  city: "",
  department: "",
  salary: [20000, 120000],
};

export const FilterContext = createContext({
  filters: initialFilters,
  setFilters: (filters: FiltersType) => {},
  showFilters: false,
  setShowFilters: (showFilters: boolean) => {},
  isSalaryActive: true,
  setIsSalaryActive: (isSalaryActive: boolean) => {},
});

interface Props {
  children: React.ReactNode;
}

export const FilterProvider = ({ children }: Props) => {
  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [isSalaryActive, setIsSalaryActive] = useState(true);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        showFilters,
        setShowFilters,
        isSalaryActive,
        setIsSalaryActive,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
