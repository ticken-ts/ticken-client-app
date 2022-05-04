import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {LoginBody, LoginForm, LoginResponse, RefreshTokenBody, RegisterBody, RegisterResponse} from '../../model/Auth';
import {getEnvironment} from '../../config/environment';
import {env} from '../../config/loadEnvironment';
import axios from 'axios';

interface InitialState {
  token?: string,
  refreshToken?: string,
  tokenDurationMs?: number,
  tokenIssueDate?: number,
}

const initialState: InitialState = {}

const urlEncoded = (data: any) => {
  return new URLSearchParams(data).toString()
}

const urlEncodedAPI = axios.create({
  baseURL: getEnvironment().authApiHost,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [urlEncoded].concat(axios.defaults.transformRequest?? [])
})

const baseAPI = axios.create({
  baseURL: getEnvironment().authApiHost,
})

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (params: LoginForm, thunkAPI) => {
    const res = await urlEncodedAPI.post<LoginResponse>('/connect/token', {
      grant_type: 'password',
      client_id: 'ticken.client.app',
      client_secret: env.API_SECRET,
      username: params.email,
      password: params.password,
      scope: 'ticken.events.api.read openid profile email offline_access',
    })
    return res.data
  })

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (params: RegisterBody, thunkAPI) => {
    const res = await baseAPI.post<RegisterResponse>('/accounts', params)
    return res.data
  })

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (params: never, {getState, dispatch}) => {
    return (await urlEncodedAPI.post<LoginResponse>('/connect/token', {
      grant_type: 'refresh_token',
      refresh_token: (getState() as any).securePersisted.auth.refreshToken,
      client_secret: env.API_SECRET,
      client_id: 'ticken.client.app',
    })).data
  }
)

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    signOutApp: state => {
      state.token = undefined
    },
    invalidateToken: state => {
      state.token = 'InvalidTokenTest'
    }
  },
  extraReducers: (builder) => builder
    .addMatcher(
      isAnyOf(refreshToken.rejected),
      (state, {payload}) => {
        state.token = undefined;
        state.refreshToken = undefined;
      }
    )
    .addMatcher(
      isAnyOf(signIn.fulfilled, refreshToken.fulfilled),
      (state, {payload}) => {
        state.token = payload.access_token;
        state.refreshToken = payload.refresh_token;
        state.tokenDurationMs = payload.expires_in * 1000;
        state.tokenIssueDate = Date.now()
      }
    )
})


export const {signOutApp, invalidateToken} = authSlice.actions

export default authSlice.reducer
