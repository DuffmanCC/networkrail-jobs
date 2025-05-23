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

export interface JobMappedInterface {
  _id: string;
  jobId: string;
  title: string;
  location: {
    city: string;
    postcode: string;
    lat: number;
    lng: number;
  };
  salary: {
    min: number | null;
    max: number | null;
  };
  department: string;
  description: string;
  content: string;
  dates: {
    start: Date;
    end: Date;
  };
  status: string;
  type: string;
  applyLink: string;
}

export type FiltersType = {
  status: string;
  department: string;
  type: string;
  city: string;
  salary: number[];
};

export interface FilterProps {
  jobs: [];
  departments: string[];
  statuses: string[];
  types: string[];
  cities: string[];
}

export interface JobMeta {
  location: {
    city: string;
    postcode: string;
  };
  department: string;
  status: string;
  type: string;
  salary: {
    min: number | null;
    max: number | null;
  };
  dates: {
    start: Date | string;
    end: Date | string;
  };
}
