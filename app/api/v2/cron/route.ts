import { init } from "@/scraping/index.mjs";
import { NextResponse } from "next/server";

export async function GET() {
  await init();

  return NextResponse.json({ message: "Cron job ran successfully" });
}
