import { NextResponse } from "next/server";
import { init } from "../../../../scraping/index.mjs";

export async function GET() {
  await init();

  return NextResponse.json({ message: "Cron job ran successfully" });
}
