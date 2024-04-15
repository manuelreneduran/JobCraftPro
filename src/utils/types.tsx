/* NAVIGATION TYPES */
export enum EPages {
    DASHBOARD = 'Dashboard',
    COVER_LETTER = 'Cover Letter'
}

export enum EPaths {
    DASHBOARD = '/',
    LOGIN = '/login',
    COVER_LETTER = '/cover-letter'
}

export enum EMenuItemSettings {
    LOGOUT = 'Logout',
    LOGIN = 'Login'
}


/* API Response Types */


export type TQueryResponse<T> = {
    result: T
}

/* Auth Types */

export type TUser = {
    email: string,
    exp: number,
    name: string,
    picture: string,
}

/* Form Types */
export type TCoverLetterFormInputs = {
    name: string;
    role: string;
    resume: string;
    jobListing: string;
    length?: number
    paragraphs?: number
}