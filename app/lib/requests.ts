import { CACHE_TIME_REQUEST } from "./constants";

export async function fetchDataFromNetworRail() {
  const response = await fetch(
    "https://www.networkrail.co.uk/wp-content/themes/sage-10/resources/careers.json"
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.career;
}

export async function fetchJobs(searchParams: { [key: string]: string }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching jobs from /api/jobs:", error);
  }
}

export async function fetchJob(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job/${id}`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`❌ Error fetching job ${id} :`, error);
  }
}

export async function fetchJobFunctions() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job-functions`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      "❌ Error fetching jobs functions from /api/job-functions:",
      error
    );
  }
}

export async function fetchJobStatuses() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job-statuses`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      "❌ Error fetching jobs statuses from /api/job-statuses:",
      error
    );
  }
}

export async function fetchJobContexts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job-contexts`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      "❌ Error fetching jobs contexts from /api/job-contexts:",
      error
    );
  }
}

export async function fetchJobCities() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job-cities`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching jobs cities from /api/job-cities:", error);
  }
}
