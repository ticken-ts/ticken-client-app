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
    apiHost: ''
  }
}

export function getEnvironment () {
  if (__DEV__) {
    return environments.DEV;
  }
  return environments.PROD;
}
