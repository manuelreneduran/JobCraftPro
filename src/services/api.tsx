// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TCoverLetter, TQueryResponse } from '../utils/types'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        generateCoverLetter: builder.mutation<TQueryResponse<string>, TCoverLetter>({
            query: (body) => ({
                url: 'generate-cover-letter',
                method: 'POST',
                body,
            }),
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGenerateCoverLetterMutation } = api