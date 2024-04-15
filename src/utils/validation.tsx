import * as yup from "yup"

/* Cover Letter Form */
export const coverLetterFormSchema = yup
    .object({
        name: yup.string().trim().required(),
        role: yup.string().trim().required(),
        resume: yup.string().trim().required(),
        jobListing: yup.string().trim().required(),
        length: yup.number(),
        paragraphs: yup.number(),
    })
    .required()

