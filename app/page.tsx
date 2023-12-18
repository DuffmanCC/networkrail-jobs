import { FilterProvider } from "./context/filter-context";
import { Job } from "./db/models/Job";
import dbConnect from "./db/mongo";
import { JobMappedInterface } from "./lib/types";
import JobsList from "./ui/JobsList";
import Sidebar from "./ui/Sidebar";

interface Props {
  searchParams: {
    [key: string]: string;
  };
}

export default async function Home({ searchParams }: Props) {
  await dbConnect();

  const jobs: JobMappedInterface[] = await Job.find({});
  const departments = jobs.map((job) => job.department);
  const statuses = jobs.map((job) => job.status);
  const types = jobs.map((job) => job.type);
  const cities = jobs.map((job) => job.location.city);

  const jobsFlat = JSON.parse(JSON.stringify(jobs));

  return (
    <FilterProvider>
      <Sidebar
        id="sidebar"
        jobs={jobsFlat}
        departments={departments}
        statuses={statuses}
        types={types}
        cities={cities}
      />

      <main className="overflow-y-auto">
        <JobsList jobs={jobsFlat} />
      </main>
    </FilterProvider>
  );
}
