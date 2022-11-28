import React, {createContext, useEffect, useReducer, useState} from 'react';
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
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [idToken, setIdToken] = useState('');

  const discovery = useAutoDiscovery(`${env.KEYCLOAK_URL}/realms/attendants`)

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
    if (idToken && discovery) {
      WebBrowser.openAuthSessionAsync(
        `${env.KEYCLOAK_URL}/realms/attendants/protocol/openid-connect/logout` +
        `?post_logout_redirect_uri=${redirectUri}` +
        `&id_token_hint=${idToken}`,
        redirectUri
      ).then(res => {
        if (res.type === 'success') {
          setToken('');
          setRefreshToken('');
          setIdToken('');
        } else {
          console.log("Error logging out:", res);
        }
      });
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
        if (res.accessToken && res.refreshToken && res.idToken) {
          setToken(res.accessToken);
          setRefreshToken(res.refreshToken);
          setIdToken(res.idToken);
        } else {
          console.log("Error exchanging code: access token or refresh token not returned");
        }
      }).catch(err => {
        console.log("Error exchanging code: ", err);
      })
    }
    if (result?.type === 'success' && result.authentication?.accessToken && result.authentication?.refreshToken && result.authentication?.idToken) {
      setToken(result.authentication.accessToken);
      setRefreshToken(result.authentication.refreshToken);
      setIdToken(result.authentication.idToken);
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
          token,
          isLoggedIn: !!token,
        }
      }>
      {children}
    </AuthContext.Provider>
  );
};
