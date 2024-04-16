import * as yup from "yup"

/* Cover Letter Form */
export const coverLetterFormSchema = yup
    .object().shape({

        name: yup.string().trim().required(),
        company: yup.string().trim().required(),
        role: yup.string().trim().required(),
        resume: yup.string().when('resumePDF', {
            is: (resumePDF?: any) => !resumePDF,
            then: (schema) => schema.required()

        }),
        resumePDF: yup.mixed().when('resume', {
            is: (resume: string) => !resume,
            then: (schema) => schema.required()
        }),
        jobListing: yup.string().trim().required(),
        length: yup.number(),
        paragraphs: yup.number(),
    }, [['resume', 'resumePDF']])


