import { init } from "../../../../scraping/index.mjs";

export async function GET() {
  await init();
}
