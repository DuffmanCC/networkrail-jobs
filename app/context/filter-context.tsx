"use client";

import { createContext, useState } from "react";
import { FiltersType } from "../lib/types";

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
  isSalaryActive: false,
  setIsSalaryActive: (isSalaryActive: boolean) => {},
});

interface Props {
  children: React.ReactNode;
}

export const FilterProvider = ({ children }: Props) => {
  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [isSalaryActive, setIsSalaryActive] = useState(false);

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
