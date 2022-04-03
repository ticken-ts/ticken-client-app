import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectAuth = (st: RootState) => st.securePersisted.auth;

export const isLoggedIn = createDraftSafeSelector(selectAuth, st => !!st.token)
