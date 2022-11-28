import React, {createContext, useEffect, useReducer} from 'react';
import {
  DiscoveryDocument,
  makeRedirectUri,
  refreshAsync,
  revokeAsync, TokenResponse,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

// Exposed interface for consumers
type AuthContextProps = {
  discovery: DiscoveryDocument | null;
  login: () => void;
  logout: () => void;
  ready: boolean;
  token: string | null;
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

export const AuthContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const discovery = useAutoDiscovery('http://192.168.0.4:8080/realms/attendants')

  const [request, result, promptAsync] = useAuthRequest({
    clientId: 'postman-attendant-app',
    redirectUri: makeRedirectUri({
      scheme: "ticken-app"
    }),
  }, discovery);

  const login = () => {
    if (request) {
      promptAsync().then(res => {
        WebBrowser.maybeCompleteAuthSession()
        if (res.type === 'success' && res.authentication?.accessToken && res.authentication.refreshToken) {
          dispatch({type: 'setToken', payload: {
            token: res.authentication.accessToken,
            refreshToken: res.authentication.refreshToken,
          }});
        } else {
          console.log("Error logging in:", res);
        }
      })
    }
  };

  const logout = () => {
    if (state.token && discovery) {
      revokeAsync({token: state.token, clientId: 'postman-attendant-app'}, discovery).then(res => {
        if (res) {
          dispatch({type: 'revokeToken'});
        }
      });

    }
  };

  useEffect(() => {
    if (discovery && state.refreshToken) {
      refreshAsync({
        refreshToken: state.refreshToken,
        clientId: 'postman-attendant-app',
      }, discovery)
        .then(res => {
          if (res.refreshToken) {
            dispatch({
              type: 'setToken', payload: {
                token: res.accessToken,
                refreshToken: res.refreshToken,
              },
            });
          } else {
            console.log("Error refreshing token: refresh token not returned");
          }
        })
        .catch(err => {
          console.log("Error refreshing token: ", err);
        })
    }
  }, [discovery])

  useEffect(() => {
    console.log("Result:", result)
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
