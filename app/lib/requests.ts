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
      `${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs`
    );

    const data = await res.json();

    return data.jobs;
  } catch (error) {
    console.error(
      `❌ Error fetching jobs from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs:`,
      error
    );
    return [];
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
    console.error(
      `❌ Error fetching job from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/${id}:`,
      error
    );
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
      `❌ Error fetching jobs functions from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/departments:`,
      error
    );
    return [];
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
      `❌ Error fetching jobs statuses from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/statuses:`,
      error
    );
    return [];
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
      `❌ Error fetching jobs contexts from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/types:`,
      error
    );
    return [];
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
      `❌ Error fetching jobs cities from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/cities:`,
      error
    );
    return [];
  }
}
