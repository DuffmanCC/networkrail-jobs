import { JobMeta } from "@/app/lib/types";
import useSingleJobMeta from "../hooks/useSingleJobMeta";

interface Props {
  meta: JobMeta;
}

export default function SingleJobMeta({ meta }: Props) {
  const { metaData } = useSingleJobMeta(meta);

  return (
    <ul className="text-base bg-orange-800 dark:bg-orange-300 px-4 sm:px-6 py-4 flex flex-col gap-1 text-slate-200 dark:text-slate-700">
      {metaData.map(({ label, value }) => (
        <li key={label} className="flex gap-1">
          <span className="font-bold">{label}:</span>
          <span>{value}</span>
        </li>
      ))}
    </ul>
  );
}
