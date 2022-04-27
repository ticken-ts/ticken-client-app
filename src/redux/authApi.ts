import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {getEnvironment} from '../config/environment';
import {LoginForm, LoginResponse} from '../model/Auth';
import auth from './reducers/auth';
import {env} from '../config/loadEnvironment';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: getEnvironment().authApiHost,
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    signIn: builder.mutation<LoginResponse, LoginForm>({
      query: (params) => ({
        url: `/token`,
        method: 'POST',
        body: (new URLSearchParams({
          grant_type: 'password',
          client_id: 'ticken.client.app',
          client_secret: env.API_SECRET,
          username: params.email,
          password: params.password,
          scope: 'ticken.events.api.read openid profile email',
        })).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }),
      invalidatesTags: ['auth'],
    })
  })
})

export const {useSignInMutation} = authApi;
