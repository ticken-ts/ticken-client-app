import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistReducer, persistStore} from 'redux-persist';
import {api} from './api';
import auth from './reducers/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist';

const securePersistedReducer = persistReducer(
  {
    key: 'secure',
    storage: EncryptedStorage,
  },
  combineReducers({
    auth,
  })
)

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  combineReducers({

  })
)

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    securePersisted: securePersistedReducer,
    persisted: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export default store
