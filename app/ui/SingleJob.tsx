import Link from "next/link";
import { useCallback } from "react";
import { JobMappedInterface } from "../lib/types";
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

  return (
    <article className="bg-brand-yellow rounded-xl shadow-xl gap-2 sm:gap-4 flex flex-col max-w-4xl py-4 sm:py-6">
      <h1 className="text-brand-green font-bold text-xl sm:text-2xl px-4 sm:px-6 flex items-center">
        {job.title}
      </h1>

      <SingleJobMeta meta={job} />

      <div className="text-base font-light leading-relaxed text-gray-600 px-4 sm:px-6 flex flex-col gap-4">
        {job.description}
      </div>

      <div className="flex justify-end px-4 sm:px-6">
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
