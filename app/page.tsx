import { FilterProvider } from "./context/filter-context";
import {
  fetchJobCities,
  fetchJobContexts,
  fetchJobFunctions,
  fetchJobStatuses,
  fetchJobs,
} from "./lib/requests";
import Filters from "./ui/Filters";
import JobsList from "./ui/JobsList";

interface Props {
  searchParams: {
    [key: string]: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const jobs = await fetchJobs(searchParams);
  const jobFunctions = (await fetchJobFunctions()) || [];
  const jobStatuses = (await fetchJobStatuses()) || [];
  const jobContexts = (await fetchJobContexts()) || [];
  const jobCities = (await fetchJobCities()) || [];

  return (
    <div className="">
      <FilterProvider>
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 h-64 sm:h-screen z-10 w-full sm:w-64 transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-brand-dark-blue">
            <Filters
              jobs={jobs}
              jobFunctions={jobFunctions}
              jobStatuses={jobStatuses}
              jobContexts={jobContexts}
              jobCities={jobCities}
            />
          </div>
        </aside>

        <div className="p-4 mt-64 sm:ml-64 sm:mt-0">
          <JobsList jobs={jobs} />
        </div>
      </FilterProvider>
    </div>
  );
}
