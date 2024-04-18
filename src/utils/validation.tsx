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
    length: yup.number().positive("Must be a positive number."),
    paragraphs: yup.number(),
  }),
});
