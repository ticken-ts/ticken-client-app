import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import {secureStorage} from '@app/redux/secureStorage';
import {openIDSlice} from '@app/redux/reducers/openID';

const EncryptedStorage = secureStorage({});

const securePersistedReducer = persistReducer(
  {
    key: 'securePersisted',
    storage: EncryptedStorage,
  },
  combineReducers({
    openID: openIDSlice.reducer,
  })
)

// const persistedReducer = persistReducer(
//   {
//     key: 'root',
//     storage: AsyncStorage,
//   },
//   combineReducers({
//
//   })
// )

const store = configureStore({
  reducer: {
    // [AUTH_REDUCER_PATH]: authApi.reducer,
    securePersisted: securePersistedReducer,
    // persisted: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export default store
