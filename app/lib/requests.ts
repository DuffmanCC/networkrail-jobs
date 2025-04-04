import { CACHE_TIME_REQUEST } from "./constants";

export async function fetchDataFromNetworRail() {
  try {
    const res = await fetch(
      "https://www.networkrail.co.uk/wp-content/themes/sage-10/resources/careers.json"
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data.jobs;
  } catch (error) {
    console.error(
      `Error fetching jobs from Network Rail:`,
      error instanceof Error ? error.message : error
    );
  }
}

export async function getJobs(apiVersion = "v2") {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data.jobs;
  } catch (error) {
    console.error(
      `Error fetching jobs from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

export async function getJob(id: string, apiVersion = "v2") {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/job/${id}`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      `Error fetching job from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/${id}:`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

export async function fetchDepartments(apiVersion = "v2") {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/departments`,
      { next: { revalidate: CACHE_TIME_REQUEST } }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(
      `Error fetching jobs functions from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/departments:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

export async function getStatuses(apiVersion = "v2") {
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
      `Error fetching jobs statuses from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/statuses:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

export async function getTypes(apiVersion = "v2") {
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
      `Error fetching jobs contexts from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/types:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

export async function getCities(apiVersion = "v2") {
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
      `Error fetching jobs cities from ${process.env.NEXT_PUBLIC_API_URL}/api/${apiVersion}/jobs/cities:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}
