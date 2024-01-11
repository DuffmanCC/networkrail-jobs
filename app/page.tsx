import { FilterProvider } from "./context/filter-context";
import { Job } from "./db/models/Job";
import dbConnect from "./db/mongo";
import { JobMappedInterface } from "./lib/types";
import JobsList from "./ui/JobsList";
import Sidebar from "./ui/Sidebar";

// interface Props {
//   searchParams: {
//     [key: string]: string;
//   };
// }

export default async function Home() {
  await dbConnect();

  const jobs: JobMappedInterface[] = await Job.find({
    "dates.end": { $gte: new Date() },
  });
  const departments = jobs.map((job) => job.department);
  const departmentesUnique = [...new Set(departments)];
  const statuses = jobs.map((job) => job.status);
  const statusesUnique = [...new Set(statuses)];
  const types = jobs.map((job) => job.type);
  const typesUnique = [...new Set(types)];
  const cities = jobs.map((job) => job.location.city);
  const citiesUnique = [...new Set(cities)];

  const jobsFlat = JSON.parse(JSON.stringify(jobs));

  return (
    <FilterProvider>
      <Sidebar
        id="sidebar"
        jobs={jobsFlat}
        departments={departmentesUnique}
        statuses={statusesUnique}
        types={typesUnique}
        cities={citiesUnique}
      />

      <main className="overflow-y-auto">
        <h1 className="sr-only">Home</h1>
        <JobsList jobs={jobsFlat} />
      </main>
    </FilterProvider>
  );
}
