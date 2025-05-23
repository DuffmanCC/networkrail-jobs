import JobsList from "@/app/ui/JobsList";
import Sidebar from "@/app/ui/Sidebar";
import { FilterProvider } from "./context/filter-context";
import {
  fetchDepartments,
  getCities,
  getJobs,
  getStatuses,
  getTypes,
} from "./lib/requests";

export default async function Home() {
  const [jobs, departments, statuses, types, cities] = await Promise.all([
    getJobs(),
    fetchDepartments(),
    getStatuses(),
    getTypes(),
    getCities(),
  ]);

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
        <h1 className="sr-only">Home</h1>
        <JobsList jobs={jobs} />
      </main>
    </FilterProvider>
  );
}
