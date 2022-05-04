interface Environment {
  apiHost: string,
  authApiHost: string,
}

interface Environments {
  PROD: Environment,
  DEV: Environment
}

const environments: Environments = {
  PROD: {
    apiHost: '',
    authApiHost: '',
  },
  DEV: {
    apiHost: 'http://192.168.0.4:8000/api',
    authApiHost: 'http://192.168.0.4:7000',
  }
}

export function getEnvironment () {
  if (__DEV__) {
    return environments.DEV;
  }
  return environments.PROD;
}
