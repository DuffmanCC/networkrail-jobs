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
  const jobs = await fetchJobs(searchParams);
  const departments = (await fetchDepartments()) || [];
  const statuses = (await fetchStatuses()) || [];
  const types = (await fetchTypes()) || [];
  const cities = (await fetchCities()) || [];

  return (
    <div className="py-12 px-2 grid grid-cols-4 gap-2 container mx-auto relative">
      <FilterProvider>
        <Sidebar
          jobs={jobs}
          departments={departments}
          statuses={statuses}
          types={types}
          cities={cities}
        />

        <main className="col-span-3">
          <JobsList jobs={jobs} />
        </main>
      </FilterProvider>
    </div>
  );
}
