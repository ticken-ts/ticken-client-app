import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Credentials = {
  token: string;
  refreshToken: string;
  idToken: string;
  expiresAt: number;
}

export const openIDSlice = createSlice({
  initialState: {
    token: '',
    refreshToken: '',
    idToken: '',
    expiresAt: 0,
  },
  reducers: {
    wipe: state => {
      state.token = '';
      state.refreshToken = '';
      state.idToken = '';
      state.expiresAt = 0;
    },
    setCredentials: (state, {payload}: PayloadAction<Credentials>) => {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.idToken = payload.idToken;
      state.expiresAt = payload.expiresAt;
    }
  },
  name: 'openID',
})

export const {wipe, setCredentials} = openIDSlice.actions;
