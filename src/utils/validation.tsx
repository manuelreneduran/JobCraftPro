import * as yup from "yup"

/* Cover Letter Form */
export const coverLetterFormSchema = yup
    .object({
        name: yup.string().trim().required(),
        position: yup.string().trim().required(),
        resume: yup.string().trim().required(),
        jobListing: yup.string().trim().required(),
        length: yup.number().required(),
    })
    .required()

