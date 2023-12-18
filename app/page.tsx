import { FilterProvider } from "./context/filter-context";
import {
  fetchCities,
  fetchDepartments,
  fetchJobs,
  fetchStatuses,
  fetchTypes,
} from "./lib/requests";
import JobsList from "./ui/JobsList";
import Sidebar from "./ui/Sidebar";

interface Props {
  searchParams: {
    [key: string]: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const jobs = await fetchJobs(searchParams, "v2");
  const departments = (await fetchDepartments()) || [];
  const statuses = (await fetchStatuses()) || [];
  const types = (await fetchTypes()) || [];
  const cities = (await fetchCities()) || [];

  return (
    <FilterProvider>
      <Sidebar
        id="sidebar"
        jobs={jobs}
        departments={departments}
        statuses={statuses}
        types={types}
        cities={cities}
      />

      <main className="overflow-y-auto">
        <JobsList jobs={jobs} />
      </main>
    </FilterProvider>
  );
}
