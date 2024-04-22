/* NAVIGATION TYPES */
export enum EPages {
  DASHBOARD = "Dashboard",
  COVER_LETTER = "Cover Letter",
}

export enum EPaths {
  DASHBOARD = "/dashboard",
  LOGIN = "/login",
  REGISTER = "/register",
  COVER_LETTER = "/cover-letter",
  RESET_PASSWORD = "/reset-password",
}

export enum EMenuItemSettings {
  LOGOUT = "Logout",
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

export type TLoginFormInputs = {
  email: string;
  password: string;
};

export type TRegistrationFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type TResetPasswordFormInputs = {
  email: string;
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
