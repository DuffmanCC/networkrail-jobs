import { useCallback } from "react";

interface Props {
  meta: {
    location: {
      city: string;
      postcode: string;
    };
    department: string;
    status: string;
    type: string;
    salary: {
      min: string;
      max: string;
    };
    dates: {
      start: string;
      end: string;
    };
  };
}

export default function SingleJobMeta({ meta }: Props) {
  const formatDate = useCallback((date: string) => {
    const dateObject = new Date(date);

    return new Intl.DateTimeFormat("en-UK", {
      dateStyle: "medium",
    }).format(dateObject);
  }, []);

  const formatCurrency = useCallback((salary: string) => {
    const number = parseInt(salary);

    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      maximumFractionDigits: 0,
      currency: "GBP",
    }).format(number);
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
            {formatCurrency(meta.salary.min)} -{" "}
            {formatCurrency(meta.salary.max)}
          </>
        ) : (
          <span>Not specified</span>
        ),
    },
  ];

  return (
    <ul className="text-base bg-brand-red px-6 py-3 flex flex-col gap-1 text-white">
      {metaData.map(({ label, value }) => (
        <li key={label} className="flex gap-1">
          <span className="font-bold">{label}:</span>
          <span>{value}</span>
        </li>
      ))}
    </ul>
  );
}
