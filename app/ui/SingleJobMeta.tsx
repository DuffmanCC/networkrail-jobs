import useSingleJobMeta from "../hooks/useSingleJobMeta";
import { JobMeta } from "../lib/types";

interface Props {
  meta: JobMeta;
}

export default function SingleJobMeta({ meta }: Props) {
  const { metaData } = useSingleJobMeta(meta);

  return (
    <ul className="text-base bg-brand-red px-4 sm:px-6 py-4 flex flex-col gap-1 text-white">
      {metaData.map(({ label, value }) => (
        <li key={label} className="flex gap-1">
          <span className="font-bold">{label}:</span>
          <span>{value}</span>
        </li>
      ))}
    </ul>
  );
}
