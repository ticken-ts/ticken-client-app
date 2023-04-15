import {
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_URL,
  EVENTS_URL,
  TICKETS_URL,
  TOTP_SECRET,
} from 'react-native-dotenv'

export const env = (() => {
  if (!KEYCLOAK_CLIENT_ID) throw new Error('KEYCLOAK_CLIENT_ID not defined')
  if (!KEYCLOAK_URL) throw new Error('KEYCLOAK_URL not defined')
  if (!EVENTS_URL) throw new Error('EVENTS_URL not defined')
  if (!TICKETS_URL) throw new Error('TICKETS_URL not defined')
  if (!TOTP_SECRET) throw new Error('TOTP_SECRET not defined')

  return {
    TICKETS_URL,
    KEYCLOAK_CLIENT_ID,
    KEYCLOAK_URL,
    EVENTS_URL,
    TOTP_SECRET,
  }
})()

__DEV__ && console.log('env', env)
