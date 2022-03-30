import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginPayload {
  token: string;
  refreshToken: string;
}

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
    logIn: (state, action: PayloadAction<LoginPayload>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    logOut: (state) => {
      state.token = undefined;
      state.refreshToken = undefined;
    }
  }
})

export const {logIn, logOut} = authSlice.actions
export default authSlice.reducer
