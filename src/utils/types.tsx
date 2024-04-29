/* NAVIGATION TYPES */
export enum EPages {
  DASHBOARD = "Dashboard",
  COVER_LETTER = "Cover Letters",
  GENERATE_COVER_LETTER = "Generate Cover Letter",
}

export enum EPaths {
  DASHBOARD = "/dashboard",
  LOGIN = "/login",
  REGISTER = "/register",
  GENERATE_COVER_LETTER = "/generate/cover-letter",
  COVER_LETTER = "/cover-letter",
  COVER_LETTER_DETAIL = "/cover-letter/:id",
  RESET_PASSWORD = "/reset-password",
  LOGOUT = "/logout",
}

export enum EMenuItemSettings {
  LOGOUT = "Logout",
}

export enum ERoles {
  USER = "user",
  ADMIN = "admin",
}

export enum ETiers {
  FREE = "free",
  PRO = "pro",
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
  uid: string;
  authProvider: string;
  email: string;
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

/* Detail Types */

export type TCoverLetterDetail = {
  text?: string;
  jobListingText: string;
  length?: string;
  paragraphs?: string;
  userUid: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};
