import Link from "next/link";
import { useCallback } from "react";
import { JobMappedInterface } from "../lib/types";

interface Props {
  job: JobMappedInterface;
}

export default function JobCard({ job }: Props) {
  const formatSalary = useCallback((salary: string) => {
    const number = parseInt(salary);

    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      maximumFractionDigits: 0,
      currency: "GBP",
    }).format(number);
  }, []);

  const formatDate = useCallback((date: string) => {
    const dateObject = new Date(date);

    return new Intl.DateTimeFormat("en-UK", {
      dateStyle: "medium",
    }).format(dateObject);
  }, []);

  return (
    <article className="bg-brand-yellow rounded-3xl shadow-xl p-6 gap-4 flex flex-col">
      <Link
        href={`/job/${job.id}`}
        className="text-brand-green font-bold sm:text-2xl grow"
      >
        <h2 className="line-clamp-2">{job.title}</h2>
      </Link>

      {job.dates.start && job.dates.end && (
        <div className="flex flex-col gap-2">
          <time className="text-brand-blue pt-2 font-bold text-sm">
            {formatDate(job.dates.start)}{" "}
            <span className="text-brand-green mr-1">to</span>
            {formatDate(job.dates.end)}
          </time>
        </div>
      )}

      <div className="line-clamp-3 text-base font-light leading-relaxed text-gray-600">
        <p className="line-clamp-3">{job.shortDescription}</p>
      </div>

      <div className="flex justify-between items-end">
        <div className="font-black flex flex-col gap-1 text-xl">
          <div className="text-brand-red ">Salary</div>

          {!job.salary.min && !job.salary.max ? (
            <div className="text-brand-dark-blue">Not specified</div>
          ) : (
            <div className="text-brand-dark-blue">
              {job.salary.min ? formatSalary(job.salary.max) : "Not specified"}

              {" - "}

              {job.salary.min ? formatSalary(job.salary.max) : "Not specified"}
            </div>
          )}
        </div>

        <div className="">
          <Link
            href={job.applyLink}
            className="bg-brand-red text-white px-4 py-2 rounded-lg block"
            target="_blank"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </article>
  );
}
