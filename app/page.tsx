import { Job } from "@/app/db/models/Job";
import dbConnect from "@/app/db/mongo";
import JobsList from "@/app/ui/JobsList";
import Sidebar from "@/app/ui/Sidebar";
import { FilterProvider } from "./context/filter-context";
import { JobMappedInterface } from "./lib/types";

export default async function Home() {
  await dbConnect();

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const jobs: JobMappedInterface[] = await Job.find({
    "dates.end": { $gte: yesterday },
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
