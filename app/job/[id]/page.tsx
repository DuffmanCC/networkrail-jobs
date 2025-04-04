import { getJob } from "@/app/lib/requests";
import SingleJob from "@/app/ui/SingleJob";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function Job({ params }: Props) {
  const job = await getJob(params.id);

  if (!job) notFound();

  return (
    <div
      className="flex justify-center items-start md:items-center pr-2 overflow-y-auto relative z-50"
      style={{ gridColumn: "1/3", gridRow: "2/3" }}
    >
      <SingleJob job={job?.job} />
    </div>
  );
}
