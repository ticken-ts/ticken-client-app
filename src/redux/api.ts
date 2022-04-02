import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';
import {getEnvironment} from '../config/environment';

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: getEnvironment().apiHost}),
  endpoints: (builder) => ({

  })
})


export const {} = api;
