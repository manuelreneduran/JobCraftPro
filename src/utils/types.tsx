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
    position: string;
    resume: string;
    jobListing: string;
    length: number
}