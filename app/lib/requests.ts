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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/jobs`);

    const data = await res.json();

    return data.jobs;
  } catch (error) {
    console.error("❌ Error fetching jobs from /api/v1/jobs:", error);
  }
}

export async function fetchJob(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/job/${id}`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`❌ Error fetching job from /api/v1/${id} :`, error);
  }
}

export async function fetchDepartments() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/departments`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      "❌ Error fetching jobs functions from /api/v1/jobs/departments:",
      error
    );
  }
}

export async function fetchStatuses() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/statuses`,
      {
        next: { revalidate: CACHE_TIME_REQUEST },
      }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      "❌ Error fetching jobs statuses from /api/v1/jobs/statuses:",
      error
    );
  }
}

export async function fetchTypes() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/types`,
      {
        next: { revalidate: CACHE_TIME_REQUEST },
      }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      "❌ Error fetching jobs contexts from /api/v1/jobs/types:",
      error
    );
  }
}

export async function fetchCities() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/jobs/cities`,
      {
        next: { revalidate: CACHE_TIME_REQUEST },
      }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      "❌ Error fetching jobs cities from /api/v1/jobs/cities:",
      error
    );
  }
}
