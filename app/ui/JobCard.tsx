import { JobMappedInterface } from "@/app/lib/types";
import { HeartIcon } from "@/app/ui/Icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface Props {
  job: JobMappedInterface;
}

export default function JobCard({ job }: Props) {
  const [isHearted, setIsHearted] = useState(false);

  const formatSalary = useCallback((salary: number) => {
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      maximumFractionDigits: 0,
      currency: "GBP",
    }).format(salary);
  }, []);

  const metaData = [
    {
      label: "ID",
      value: job.jobId,
    },
    {
      label: "Location",
      value: `${job.location.city}`,
    },
    {
      label: "Department",
      value: job.department,
    },
    {
      label: "Type",
      value: `${job.type} - ${job.status}`,
    },
    {
      label: "Closing date",
      value: new Date(job.dates.end).toLocaleDateString("en-UK", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  ];

  function handleClickHeart() {
    setIsHearted((prev) => !prev);

    const heartedJobs = JSON.parse(localStorage.getItem("heartedJobs") || "[]");

    if (heartedJobs.includes(job.jobId)) {
      const index = heartedJobs.indexOf(job.jobId);
      heartedJobs.splice(index, 1);
    } else {
      heartedJobs.push(job.jobId);
      localStorage.setItem("heartedJobs", JSON.stringify(heartedJobs));
    }
  }

  useEffect(() => {
    const heartedJobs = JSON.parse(localStorage.getItem("heartedJobs") || "[]");

    if (heartedJobs.includes(job.jobId)) {
      setIsHearted(true);
    }
  }, [job.jobId]);

  return (
    <Card
      className="job-card hover:scale-101 bg-slate-200 dark:bg-slate-800"
      shadow="none"
      radius="sm"
    >
      <CardHeader className="relative pr-8">
        <Link href={`/job/${job.jobId}`} className="">
          <h2 className="line-clamp-1 text-brand-green font-bold underline decoration-current">
            {job.title.split("-")[0]}
          </h2>
        </Link>

        <button onClick={handleClickHeart}>
          <HeartIcon
            className="w-6 h-6 text-brand-red absolute right-2 top-3 hover:scale-105"
            fill={isHearted ? "currentColor" : "none"}
          />
        </button>
      </CardHeader>

      <Divider />

      <CardBody className="line-clamp-3 text-base font-light leading-relaxed">
        {metaData.map((meta, index) => (
          <div key={index} className="flex gap-1 line-clamp-1">
            <div className="font-bold line-clamp-1">{meta.label}:</div>
            <div className="line-clamp-1">{meta.value}</div>
          </div>
        ))}
      </CardBody>

      <Divider />

      <CardFooter className="flex justify-between items-end">
        <div className="font-black flex flex-col gap-1 text-sm">
          <div className="text-brand-red">Salary range</div>

          {!job.salary.min && !job.salary.max ? (
            <div className="text-xs">Not specified</div>
          ) : (
            <div className="text-xs">
              {job.salary.min ? formatSalary(job.salary.min) : "Not specified"}

              {" - "}

              {job.salary.max ? formatSalary(job.salary.max) : "Not specified"}
            </div>
          )}
        </div>

        <Button size="sm">
          <Link href={job.applyLink} target="_blank" rel="noreferrer">
            Apply Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
