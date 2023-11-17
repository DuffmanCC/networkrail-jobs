import { fetchJob } from "@/app/lib/requests";
import SingleJob from "@/app/ui/SingleJob";

interface Props {
  params: {
    id: string;
  };
}

export default async function Job({ params }: Props) {
  const job = await fetchJob(params.id);

  return <>{job && <SingleJob job={job} />}</>;
}
