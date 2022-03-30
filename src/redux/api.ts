import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  endpoints: (builder) => ({

  })
})

export const {} = api;
