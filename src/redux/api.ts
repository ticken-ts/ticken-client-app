import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {getEnvironment} from '../config/environment';
import {EventModel} from '../model/Event';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: getEnvironment().apiHost}),
  endpoints: (builder) => ({
    getEvents: builder.query<EventModel, {page: number, pageSize: number}>({
      query: (params) => `/e/events?Start=${params.page}&PageSize=${params.pageSize}`,
    })
  })
})


export const {useGetEventsQuery} = api;
