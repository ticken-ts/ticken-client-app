import {TEST_API_SECRET, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET} from 'react-native-dotenv'

export const env = (() => {

  const API_SECRET = process.env.API_SECRET || TEST_API_SECRET
  if (!API_SECRET) throw new Error('API_SECRET and TEST_API_SECRET not defined')

  return {
    API_SECRET,
    KEYCLOAK_CLIENT_SECRET,
    KEYCLOAK_CLIENT_ID,
  }
})()
