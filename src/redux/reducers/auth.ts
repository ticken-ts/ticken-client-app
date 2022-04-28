import {createSlice} from '@reduxjs/toolkit';
import {authApi} from '../authApi';

interface InitialState {
  token?: string,
  refreshToken?: string
}

const initialState: InitialState = {
  token: undefined,
  refreshToken: undefined
}

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    signOutApp: state => {
      state.token = ''
    }
  },
  extraReducers: builder => builder
    .addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, {payload}) => {
        state.token = payload.access_token;
      }
    )
})


export const {signOutApp} = authSlice.actions

export default authSlice.reducer
