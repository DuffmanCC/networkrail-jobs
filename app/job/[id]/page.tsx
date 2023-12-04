import { fetchJob } from "@/app/lib/requests";
import SingleJob from "@/app/ui/SingleJob";

interface Props {
  params: {
    id: string;
  };
}

export default async function Job({ params }: Props) {
  const job = await fetchJob(params.id);

  return (
    <div
      className="flex justify-center items-start md:items-center pr-2 overflow-y-auto relative z-50"
      style={{ gridColumn: "1/3", gridRow: "2/3" }}
    >
      {job ? (
        <SingleJob job={job} />
      ) : (
        <div className="text-foreground bg-background self-center text-2xl">
          404 | Job not found
        </div>
      )}
    </div>
  );
}
