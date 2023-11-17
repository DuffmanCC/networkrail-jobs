export interface JobInterface {
  VACANCY_ID: string;
  POSTING_CONTENT_ID: string;
  VACANCY_NAME: string;
  VAC_ADVERTISE_START_DATE: string;
  VAC_ADVERTISE_END_DATE: string;
  JOB_FUNCTION: string;
  TOWN_OR_CITY: string;
  POSTAL_CODE: string;
  FUNCTION: string;
  EMPLOYEEMENT_STATUS: string;
  VACANCY_CONTEXT: string;
  MIN_SALARY: string;
  MAX_SALARY: string;
  SEARCH_ATTR_7: string;
  DISPLAYED_JOB_TITLE: string;
  DEPARTMENT_AND_HOW_IT_RELATES_TO_THE_ROLE: string;
  LATITUDE?: number;
  LONGITUDE?: number;
}

export type JobContentSchema = {
  location: string;
  department: string;
  description: string;
  howToApply: string;
  aboutTheRole: {
    essential: string[];
    desirable: string[];
    keyAccountabilities: string[];
    briefDescription: string;
  };
};

export type JobContentSchema = {
  location: string;
  department: string;
  description: string;
  howToApply: string;
  aboutTheRole: {
    essential: string[];
    desirable: string[];
    keyAccountabilities: string[];
    briefDescription: string;
  };
};

export interface JobMappedInterface {
  id: string;
  title: string;
  location: {
    city: string;
    postcode: string;
    lat: number;
    lng: number;
  };
  salary: { min: string; max: string };
  function: string;
  content: JobContentSchema;
  shortDescription: string;
  dates: {
    start: string;
    end: string;
  };
  status: string;
  context: string;
  applyLink: string;
}

export type Filters = {
  status?: string;
  function?: string;
  context?: string;
  city?: string;
  salaryMin?: string;
  salaryMax?: string;
};

export type Options = SelectOption[];

export type SelectOption = { value: string; label: string };
