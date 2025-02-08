import { init } from "@/scraping/index.mjs";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Cron job triggered at:", new Date().toISOString());

  try {
    const jobs = await init();
    return NextResponse.json(
      {
        message: "Cron job completed successfully",
        newJobsAdded: jobs,
      },
      { status: 200 } // 200 is the default status code
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in cron job:", msg);
    return NextResponse.json(
      { message: "Cron job failed", error: msg },
      { status: 500 }
    );
  }
}
