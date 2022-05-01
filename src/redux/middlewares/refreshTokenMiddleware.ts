import {createListenerMiddleware, isRejectedWithValue} from '@reduxjs/toolkit';
import {api} from '../api';
import {refreshToken} from '../reducers/auth';

const refreshTokenMiddleware = createListenerMiddleware()

refreshTokenMiddleware.startListening({
  matcher: isRejectedWithValue(),
  effect: async (action, listenerAPI) => {
    console.log('Request rejected', action.type)
    if (action.payload.originalStatus === 401 || action.payload.status === 401) {
      await listenerAPI.dispatch(refreshToken())
      console.log('Token refreshed')
    }
  }
})

export default refreshTokenMiddleware.middleware
