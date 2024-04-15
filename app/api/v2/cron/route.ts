import { init } from "../../../../scraping/index.mjs";

export async function GET() {
  await init();

  return Response.json({ message: "Cron job ran successfully" });
}
