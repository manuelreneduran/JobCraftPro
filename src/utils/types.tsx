/* NAVIGATION TYPES */
export enum EPages {
  DASHBOARD = "Dashboard",
  COVER_LETTER = "Cover Letter",
}

export enum EPaths {
  DASHBOARD = "/",
  LOGIN = "/login",
  COVER_LETTER = "/cover-letter",
}

export enum EMenuItemSettings {
  LOGOUT = "Logout",
  LOGIN = "Login",
}

/* API Response Types */

export type TQueryResponse<T> = {
  result: T;
};

/* API Request Types */
export type TGenerateCoverLetterRequest = {
  resumeText?: string;
  resumePDF?: any;
  jobListingText: string;
  length?: string;
  paragraphs?: string;
};

/* Auth Types */

export type TUser = {
  email: string;
  exp: number;
  name: string;
  picture: string;
};

/* Form Types */
export type TCoverLetterFormInputs = {
  resume: {
    resumeText?: string;
    resumePDF?: any;
  };
  jobListing: {
    jobListingText: string;
  };
  parameters: {
    length?: number;
    paragraphs?: number;
  };
};
