interface Environment {
  apiHost: string,
}

interface Environments {
  PROD: Environment,
  DEV: Environment
}

const environments: Environments = {
  PROD: {
    apiHost: ''
  },
  DEV: {
    apiHost: 'http://192.168.0.4:7010/api'
  }
}

export function getEnvironment () {
  if (__DEV__) {
    return environments.DEV;
  }
  return environments.PROD;
}
