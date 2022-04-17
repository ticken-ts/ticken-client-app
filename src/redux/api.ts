import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {getEnvironment} from '../config/environment';
import {EventModel} from '../model/Event';
import {createApi} from '@reduxjs/toolkit/dist/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: getEnvironment().apiHost}),
  tagTypes: ['events'],
  endpoints: (builder) => ({
    getEvents: builder.query<EventModel[], {page: number, pageSize: number}>({
      query: (params) => ({
        url: `/e/events`,
        params: {
          Start: params.page,
          PageSize: params.pageSize,
        }
      }),
      providesTags: ['events'],
    })
  })
})


export const {useGetEventsQuery} = api;
