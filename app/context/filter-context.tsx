"use client";

import { createContext, useState } from "react";
import { Filters } from "../lib/types";

export const FilterContext = createContext({
  filters: {},
  setFilters: (filters: Filters) => {},
});

interface Props {
  children: React.ReactNode;
}

export const FilterProvider = ({ children }: Props) => {
  const [filters, setFilters] = useState<Filters>({});

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
