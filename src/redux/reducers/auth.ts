// import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
// import {LoginForm, LoginResponse, RegisterBody, RegisterResponse} from '../../model/Auth';
// import {getEnvironment} from '../../config/environment';
// import {env} from '../../config/loadEnvironment';
// import axios from 'axios';
//
// interface InitialState {
//   token?: string,
//   refreshToken?: string,
//   tokenDurationMs?: number,
//   tokenIssueDate?: number,
// }
//
// const initialState: InitialState = {}
//
// const urlEncoded = (data: any) => {
//   return new URLSearchParams(data).toString()
// }
//
// const urlEncodedAPI = axios.create({
//   baseURL: getEnvironment().authApiHost,
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   transformRequest: Array.isArray(axios.defaults.transformRequest)
//     ? [urlEncoded, ...axios.defaults.transformRequest]
//     : axios.defaults.transformRequest
//       ? [axios.defaults.transformRequest, urlEncoded]
//       : [urlEncoded]
// })
//
// const baseAPI = axios.create({
//   baseURL: getEnvironment().authApiHost,
// })
//
// export const signIn = createAsyncThunk(
//   'auth/signIn',
//   async (params: LoginForm, _thunkAPI) => {
//     const res = await urlEncodedAPI.post<LoginResponse>('/connect/token', {
//       grant_type: 'password',
//       client_id: 'ticken.client.app',
//       client_secret: env.API_SECRET,
//       username: params.email,
//       password: params.password,
//       // scope: 'ticken.events.api.read openid profile email offline_access',
//     })
//     console.log('signed in:', res.data)
//     return res.data
//   })
//
// export const signInClientCredentials = createAsyncThunk(
//   'auth/signInClientCredentials',
//   async (_params: never, _thunkAPI) => {
//     const res = await urlEncodedAPI.post<LoginResponse>('/connect/token', {
//       grant_type: 'client_credentials',
//       client_id: 'ticken.client.app',
//       client_secret: env.API_SECRET,
//       // scope: 'ticken.events.api.read ticken.api.gateway',
//     })
//     return res.data
//   })
//
// export const signUp = createAsyncThunk(
//   'auth/signUp',
//   async (params: RegisterBody, _thunkAPI) => {
//     const res = await baseAPI.post<RegisterResponse>('/accounts', params)
//     return res.data
//   })
//
// export const refreshToken = createAsyncThunk(
//   'auth/refreshToken',
//   async (params: never, {getState}) => {
//     const res = await urlEncodedAPI.post<LoginResponse>('/connect/token', {
//       grant_type: 'refresh_token',
//       refresh_token: (getState() as any).securePersisted.auth.refreshToken,
//       client_secret: env.API_SECRET,
//       client_id: 'ticken.client.app',
//     })
//     return res.data
//   }
// )
//
// const authSlice = createSlice({
//   initialState,
//   name: 'auth',
//   reducers: {
//     signOutApp: state => {
//       state.token = undefined
//       state.refreshToken = undefined
//     },
//     invalidateToken: state => {
//       state.token = 'InvalidTokenTest'
//     }
//   },
//   extraReducers: (builder) => builder
//     .addMatcher(
//       isAnyOf(refreshToken.rejected),
//       (state) => {
//         state.token = undefined;
//         state.refreshToken = undefined;
//       }
//     )
//     .addMatcher(
//       isAnyOf(signIn.fulfilled, refreshToken.fulfilled, signInClientCredentials.fulfilled),
//       (state, {payload}) => {
//         state.token = payload.access_token;
//         state.refreshToken = payload.refresh_token;
//         state.tokenDurationMs = payload.expires_in * 1000;
//         state.tokenIssueDate = Date.now()
//       }
//     )
// })
//
//
// export const {signOutApp, invalidateToken} = authSlice.actions
//
// export default authSlice.reducer
