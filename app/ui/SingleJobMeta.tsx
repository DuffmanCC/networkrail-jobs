import { useCallback } from "react";

interface Props {
  meta: {
    function: string;
    status: string;
    context: string;
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

  return (
    <div className="text-base bg-brand-red px-6 py-3 flex flex-col gap-1 text-white">
      <div>
        <span className="font-bold">Department: </span>
        {meta.function}
      </div>
      <div>
        <span className="font-bold">Type: </span>
        {meta.status} - {meta.context}
      </div>
      <div>
        <span className="font-bold">Closing date: </span>
        {formatDate(meta.dates.end)}
      </div>
    </div>
  );
}
