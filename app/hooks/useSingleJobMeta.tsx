import { JobMeta } from "@/app/lib/types";
import { useCallback } from "react";

export default function useSingleJobMeta(meta: JobMeta) {
  const formatDate = useCallback((date: Date | string) => {
    const dateObject = new Date(date);

    return new Intl.DateTimeFormat("en-UK", {
      dateStyle: "medium",
    }).format(dateObject);
  }, []);

  const formatCurrency = useCallback((salary: number) => {
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      maximumFractionDigits: 0,
      currency: "GBP",
    }).format(salary);
  }, []);

  const metaData = [
    {
      label: "Location",
      value: `${meta.location.city} - ${meta.location.postcode}`,
    },
    {
      label: "Department",
      value: meta.department,
    },
    {
      label: "Type",
      value: `${meta.status} - ${meta.type}`,
    },
    {
      label: "Closing date",
      value: formatDate(meta.dates.end),
    },
    {
      label: "Salary range",
      value:
        meta.salary.min && meta.salary.max ? (
          <>
            {`${formatCurrency(meta.salary.min)} - ${formatCurrency(
              meta.salary.max
            )}`}
          </>
        ) : (
          <span>Not specified</span>
        ),
    },
  ];

  return { metaData };
}
