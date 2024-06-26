import { FilterProvider } from "./context/filter-context";
import { Job } from "./db/models/Job";
import dbConnect from "./db/mongo";
import { JobMappedInterface } from "./lib/types";
import JobsList from "./ui/JobsList";
import Sidebar from "./ui/Sidebar";

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
        departments={departmentesUnique}
        statuses={statusesUnique}
        types={typesUnique}
        cities={citiesUnique}
      />

      <main className="overflow-y-auto">
        <h1 className="sr-only">Home</h1>
        <JobsList jobs={jobsDeepCopy} />
      </main>
    </FilterProvider>
  );
}
