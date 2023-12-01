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
      className="grid justify-center items-start pt-16 min-h-screen px-4"
      style={{ gridColumn: "2/3" }}
    >
      <SingleJob job={job} />
    </div>
  );
}
