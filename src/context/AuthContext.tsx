import React, {createContext, useEffect, useReducer} from 'react';
import {
  DiscoveryDocument, exchangeCodeAsync,
  makeRedirectUri, refreshAsync,
  revokeAsync, TokenResponse,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {selectToken} from '@app/redux/selectors/auth';
import {useSelector} from 'react-redux';
import useAppDispatch from '@app/hooks/useDispatch';
import {env} from '@app/config/loadEnvironment';

WebBrowser.maybeCompleteAuthSession();

// Exposed interface for consumers
type AuthContextProps = {
  discovery: DiscoveryDocument | null;
  login: () => void;
  logout: () => void;
  ready: boolean;
  token: string | null;
  isLoggedIn: boolean;
};

// Internal State type
interface InternalState {
  token: string | null;
  refreshToken: string | null;
}

// Initial internal state
const initialState: InternalState = {
  token: null,
  refreshToken: null,
};

export const AuthContext = createContext({} as AuthContextProps);

const redirectUri = makeRedirectUri({
  scheme: "ticken-app",
})

export const AuthContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const discovery = useAutoDiscovery('http://192.168.0.4:8080/realms/attendants')

  const [request, result, promptAsync] = useAuthRequest({
    clientId: env.KEYCLOAK_CLIENT_ID,
    usePKCE: false,
    redirectUri,
    clientSecret: env.KEYCLOAK_CLIENT_SECRET,
    scopes: ['openid', 'profile', 'email', 'offline_access'],
  }, discovery);

  const login = () => {
    if (request) {
      promptAsync().then(res => {
        WebBrowser.maybeCompleteAuthSession()
        // if (res.type === 'success' && res.authentication?.accessToken && res.authentication.refreshToken) {
        //   dispatch({type: 'setToken', payload: {
        //     token: res.authentication.accessToken,
        //     refreshToken: res.authentication.refreshToken,
        //   }});
        // } else {
        //   console.log("Error logging in:", res);
        // }
      })
    }
  };

  const logout = () => {
    if (state.token && discovery) {

    }
  };

  useEffect(() => {
    console.log("Result:", result)
    if (!discovery) {
      console.log("Discovery not ready");
      return;
    }
    if (result?.type === 'success' && result.authentication == null) {
      exchangeCodeAsync({
        code: result.params['code'],
        redirectUri,
        clientId: env.KEYCLOAK_CLIENT_ID,
        clientSecret: env.KEYCLOAK_CLIENT_SECRET,
        scopes: ['openid', 'profile', 'email', 'offline_access'],
      }, discovery).then(res => {
        console.log("Exchanged code:", res)
        if (res.accessToken && res.refreshToken) {
          dispatch({
            type: 'setToken', payload: {
              token: res.accessToken,
              refreshToken: res.refreshToken,
            },
          });
        } else {
          console.log("Error exchanging code: access token or refresh token not returned");
        }
      }).catch(err => {
        console.log("Error exchanging code: ", err);
      })
    }
    if (result?.type === 'success' && result.authentication?.accessToken && result.authentication?.refreshToken) {
      dispatch({type: 'setToken', payload: {
        token: result.authentication.accessToken,
        refreshToken: result.authentication.refreshToken,
      }});
    }
  }, [result]);


  // TODO: Create functions to expose

  return (
    <AuthContext.Provider
      value={
        {
          discovery,
          login,
          logout,
          ready: !!request,
          token: state.token,
          isLoggedIn: !!state.token,
        }
      }>
      {children}
    </AuthContext.Provider>
  );
};

//Action Types
type Action =
  |{type: 'setToken'; payload: {
    token: string,
    refreshToken: string,
  }}
  |{type: 'revokeToken'}

const reducer = (state: InternalState, action: Action): InternalState => {
  switch (action.type) {
    //Switch action types
    case 'setToken':
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      }
    case 'revokeToken':
      return {
        ...state,
        token: null,
      }
  }
};
