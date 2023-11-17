import Link from "next/link";
import { useCallback } from "react";
import { JobMappedInterface } from "../lib/types";
import SingleJobContent from "./SingleJobContent";
import SingleJobMeta from "./SingleJobMeta";

interface Props {
  job: JobMappedInterface;
}

export default function SingleJob({ job }: Props) {
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
    <article className="bg-brand-yellow rounded-3xl shadow-xl gap-4 flex flex-col max-w-4xl mx-auto mt-12 py-6">
      <h1 className=" text-brand-green font-bold text-2xl grow px-6">
        {job.title}
      </h1>

      <SingleJobMeta meta={job} />

      {job.dates.start && job.dates.end && (
        <div className="flex flex-col gap-2 px-6">
          <time className="text-brand-blue pt-2 font-bold text-sm">
            {formatDate(job.dates.start)}{" "}
            <span className="text-brand-green mr-1">to</span>
            {formatDate(job.dates.end)}
          </time>
        </div>
      )}

      {job.content?.description ? (
        <SingleJobContent jobContent={job.content} />
      ) : (
        <div className="text-base font-light leading-relaxed text-gray-600 px-6 flex flex-col gap-4">
          {job.shortDescription}
        </div>
      )}

      <div className="font-black flex flex-col gap-2 text-xl px-6">
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

      <div className="flex justify-end px-6">
        {job.applyLink && (
          <Link
            href={job.applyLink}
            className="bg-brand-red text-white px-4 py-2 rounded-lg"
            target="_blank"
          >
            Apply Now
          </Link>
        )}
      </div>
    </article>
  );
}
