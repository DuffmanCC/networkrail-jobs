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

export async function fetchJobs(
  searchParams: { [key: string]: string },
  apiVersion = "v2"
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/${apiVersion}/jobs`
    );

    const data = await res.json();

    return data.jobs;
  } catch (error) {
    console.error("❌ Error fetching jobs from /api/v1/jobs:", error);
  }
}

export async function fetchJob(id: string, apiVersion = "v2") {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/job/${id}`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`❌ Error fetching job from /api/v1/${id} :`, error);
  }
}

export async function fetchDepartments(apiVersion = "v2") {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/departments`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      `❌ Error fetching jobs functions from /api/${apiVersion}/jobs/departments:`,
      error
    );
  }
}

export async function fetchStatuses(apiVersion = "v2") {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/statuses`,
      {
        next: { revalidate: CACHE_TIME_REQUEST },
      }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      `❌ Error fetching jobs statuses from /api/${apiVersion}/jobs/statuses:`,
      error
    );
  }
}

export async function fetchTypes(apiVersion = "v2") {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/types`,
      {
        next: { revalidate: CACHE_TIME_REQUEST },
      }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      `❌ Error fetching jobs contexts from /api/${apiVersion}/jobs/types:`,
      error
    );
  }
}

export async function fetchCities(apiVersion = "v2") {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/cities`,
      {
        next: { revalidate: CACHE_TIME_REQUEST },
      }
    );

    if (!res.ok) return;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      `❌ Error fetching jobs cities from /api/${apiVersion}/jobs/cities:`,
      error
    );
  }
}
