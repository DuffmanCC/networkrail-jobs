import { init } from "@/scraping/index.mjs";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Cron job triggered at:", new Date().toISOString());

  try {
    await init();
    const message = "Cron job completed successfully";
    console.log(message);
    return NextResponse.json({ message });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in cron job:", msg);
    return NextResponse.json(
      { message: "Cron job failed", error: msg },
      { status: 500 }
    );
  }
}
