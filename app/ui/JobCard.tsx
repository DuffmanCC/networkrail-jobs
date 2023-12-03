import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
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

  const metaData = [
    {
      label: "ID",
      value: job.id,
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

  return (
    <Card className="job-card hover:scale-101" shadow="sm">
      <CardHeader>
        <Link href={`/job/${job.id}`}>
          <h2 className="line-clamp-1 text-brand-green font-bold">
            {job.title.split("-")[0]}
          </h2>
        </Link>
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
          <div className="text-brand-red ">Salary range</div>

          {!job.salary.min && !job.salary.max ? (
            <div className="text-xs">Not specified</div>
          ) : (
            <div className="text-xs">
              {job.salary.min ? formatSalary(job.salary.min) : "Not specified"}

              {" - "}

              {job.salary.min ? formatSalary(job.salary.max) : "Not specified"}
            </div>
          )}
        </div>

        <Button size="sm">
          <Link href={job.applyLink} target="_blank">
            Apply Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
