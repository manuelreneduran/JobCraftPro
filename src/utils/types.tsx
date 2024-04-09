/* API Response Types */

export type TCoverLetter = {
    resumeText: string,
    jobListingText: string
}

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