import { Job } from "@/app/db/models/Job";
import dbConnect from "@/app/db/mongo";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const job = new Job(body);

    const result = await job.save();

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "error from the server" });
  }
}

export async function GET(req: Request) {
  return Response.json({ message: "nothing here" });
}
