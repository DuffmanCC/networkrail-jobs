import JobsList from "@/app/ui/JobsList";
import Sidebar from "@/app/ui/Sidebar";
import { FilterProvider } from "./context/filter-context";
import {
  fetchCities,
  fetchDepartments,
  fetchJobs,
  fetchStatuses,
  fetchTypes,
} from "./lib/requests";

export default async function Home() {
  const jobs = await fetchJobs({});
  const departments = await fetchDepartments();
  const statuses = await fetchStatuses();
  const types = await fetchTypes();
  const cities = await fetchCities();

  /**
   * jobsDeepCopy is passed as a prop to the Sidebar component.
   * If Sidebar or any other component modifies the jobs array
   * (for example, by filtering or sorting it), those modifications
   * would also affect the original jobs array if a deep copy wasn't made.
   * This could lead to unexpected behavior in other parts of your
   * app that also use the jobs array.
   *
   * By passing a deep copy to Sidebar, you ensure that any
   * modifications made to the jobs array inside Sidebar won't
   * affect the jobs array in the Home component.
   */
  const jobsDeepCopy = JSON.parse(JSON.stringify(jobs));

  return (
    <FilterProvider>
      <Sidebar
        id="sidebar"
        jobs={jobsDeepCopy}
        departments={departments}
        statuses={statuses}
        types={types}
        cities={cities}
      />

      <main className="overflow-y-auto">
        <h1 className="sr-only">Home</h1>
        <JobsList jobs={jobsDeepCopy} />
      </main>
    </FilterProvider>
  );
}
