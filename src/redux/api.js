import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { formatError } from './errorHandler';


// Define a service using a base URL and expected endpoints
export const textApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://diamond-et14.onrender.com' }),
  endpoints: (builder) => ({
    sendText: builder.mutation({
      query({text, email, uri}) {
        return {
          url: `/${uri}?email=${email}&text=${text}`,
          method: "POST"
        };

      },
      transformErrorResponse: (response, meta, arg) => ({
        message: formatError(response),
        error: formatError(response),
      }),
      
     
    }),
    deleteChat: builder.mutation({
      query({ email}) {
        return {
          url: `/conversation?email=${email}`,
          method: "DELETE"
        };

      },
      transformErrorResponse: (response, meta, arg) => ({
        message: formatError(response),
        error: formatError(response),
      }),
      
     
    }),
    register: builder.mutation({
      query(email) {
        return {
          url: `/start?email=ojo@gmail.com`,
          method: "POST"
        };

      },
      transformErrorResponse: (response, meta, arg) => ({
        message: formatError(response),
        error: formatError(response),
      }),
    }),

    getMessage: builder.query({
      query: (email) => `chathistory/?email=${email}`,
      transformErrorResponse: (response, meta, arg) => ({
        message: formatError(response),
        error: formatError(response),
      }),
    }),  


  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useSendTextMutation , useRegisterMutation, useGetMessageQuery, useDeleteChatMutation} = textApi