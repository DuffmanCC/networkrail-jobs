import { Job } from "@/app/db/models/Job";
import dbConnect from "@/app/db/mongo";
import { JobMappedInterface } from "@/app/lib/types";
import { NextResponse } from "next/server";

type JobQuery = {
  "dates.end"?: { $gte?: Date; $lte?: Date };
  "location.city"?: string;
  department?: string;
  status?: string;
  type?: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get("city");
  const department = searchParams.get("department");
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  await dbConnect();

  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const query: JobQuery = {
      "dates.end": { $gte: yesterday },
    };

    if (city) {
      query["location.city"] = city;
    }

    if (department) {
      query.department = department;
    }

    if (status) {
      query.status = status;
    }

    if (type) {
      query.type = type;
    }

    if (from) {
      const [day, month, year] = from.split("-");
      const fromDate = new Date(`${year}-${month}-${day}`);
      query["dates.end"] = { ...query["dates.end"], $gte: fromDate };
    }

    if (to) {
      const [day, month, year] = to.split("-");
      const toDate = new Date(`${year}-${month}-${day}`);
      query["dates.end"] = { ...query["dates.end"], $lte: toDate };
    }

    const jobs: JobMappedInterface[] = await Job.find(query);

    return NextResponse.json({
      success: true,
      jobsCount: jobs.length,
      filterBy: {
        city,
        department,
        status,
        type,
        from,
        to,
      },
      jobs,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : error;
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
