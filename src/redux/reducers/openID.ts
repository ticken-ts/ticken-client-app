import {createDraftSafeSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '@app/redux/store';

export const openIDSlice = createSlice({
  initialState: {
    token: '',
    refreshToken: '',
    idToken: '',
  },
  reducers: {
    wipe: state => {
      state.token = '';
      state.refreshToken = '';
      state.idToken = '';
    },
    setCredentials: (state, {payload}) => {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.idToken = payload.idToken;
    }
  },
  name: 'openID',
})

export const {wipe, setCredentials} = openIDSlice.actions;
