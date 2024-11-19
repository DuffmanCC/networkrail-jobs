import { Job } from "@/app/db/models/Job";
import dbConnect from "@/app/db/mongo";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const job = await Job.find({ jobId: params.id });

    if (job.length === 0) {
      return Response.json(
        { error: `Job ${params.id} not found` },
        {
          status: 404,
        }
      );
    }

    return Response.json({ success: true, job: job[0] });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "An error occurred";
    return Response.json({ error: msg }, { status: 500 });
  }
}
