// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  TGenerateCoverLetterRequest,
  TQueryResponse,
} from "../utils/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    generateCoverLetter: builder.mutation<
      TQueryResponse<string>,
      TGenerateCoverLetterRequest
    >({
      query: (body) => {
        let formData = new FormData();
        formData.append("jobListingText", body.jobListingText);

        if (body.resumePDF) {
          formData.append("resumePDF", body.resumePDF);
        }
        if (body.resumeText) {
          formData.append("resumeText", body.resumeText);
        }
        if (body.length) {
          formData.append("length", body.length);
        }
        if (body.paragraphs) {
          formData.append("paragraphs", body.paragraphs);
        }
        return {
          url: "generate/cover-letter",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGenerateCoverLetterMutation } = api;
