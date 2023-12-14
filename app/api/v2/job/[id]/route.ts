import { Job } from "@/app/db/models/Job";
import dbConnect from "@/app/db/mongo";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const job = await Job.find({ jobId: params.id });

    if (job.length === 0) {
      return Response.json({ error: `Job ${params.id} not found` });
    }

    return Response.json({ success: true, job: job[0] });
  } catch (error) {
    return Response.json({ error: "error from the server" });
  }
}
