
export interface LoginForm {
  email: string,
  password: string,
}

export interface LoginBody {
  grant_type: 'password',
  client_id: string,
  client_secret: string,
  username: string,
  password: string,
  scope: string,
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenBody {
  grant_type: 'refresh_token',
  client_id: string,
  client_secret: string,
  refresh_token: string,
}

export interface RefreshTokenResponse {
  access_token: string
  refresh_token: string
}
