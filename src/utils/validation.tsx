import * as yup from "yup";

/* Cover Letter Form */
export const coverLetterFormSchema = yup.object().shape({
  resume: yup.object().shape(
    {
      resumeText: yup.string().when("resumePDF", {
        is: (resumePDF?: any) => !resumePDF,
        then: (schema) =>
          schema.required(
            "Please upload a resume PDF file or copy and paste your resume to continue."
          ),
      }),
      resumePDF: yup.mixed().when("resumeText", {
        is: (resume: string) => !resume,
        then: (schema) =>
          schema.required(
            "Please upload a resume PDF file or copy and paste your resume to continue."
          ),
      }),
    },
    [["resumeText", "resumePDF"]]
  ),
  jobListing: yup.object().shape({
    jobListingText: yup.string().trim().required(),
  }),
  parameters: yup.object().shape({
    name: yup.string().trim().required(),
    company: yup.string().trim().required(),
    role: yup.string().trim().required(),

    length: yup.number(),
    paragraphs: yup.number(),
  }),
});
