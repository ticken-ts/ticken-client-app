import {
  createListenerMiddleware,
  isAsyncThunkAction,
  isPending,
  isRejected,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import {refreshToken} from '../reducers/auth';
import {api} from '../api';

const refreshTokenMiddleware = createListenerMiddleware()

refreshTokenMiddleware.startListening({
  matcher: isRejectedWithValue(),
  effect: async (action, listenerAPI) => {
    const endpoint = action.meta.arg.endpointName;
    const originalArgs = action.meta.arg.originalArgs
    console.log('Request rejected', action.type)
    if (action.payload.originalStatus === 401 || action.payload.status === 401) {
      await listenerAPI.dispatch(refreshToken())
      await listenerAPI.condition((action, currentState) => {
        console.log(currentState)
        return true
      })
      console.log('Token refreshed')
      // const res = await listenerAPI.dispatch(api.endpoints[endpoint].initiate(originalArgs, {track: false}))
      // console.log('Query retried', res)
    }
  }
})

export default refreshTokenMiddleware.middleware
