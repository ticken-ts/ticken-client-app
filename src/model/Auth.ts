
export interface LoginForm {
  email: string,
  password: string,
}

export interface LoginBody {
  grant_type: 'password' | 'client_credentials',
  client_id: string,
  client_secret: string,
  username?: string,
  password?: string,
  scope: string,
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface LoginError {
  error: string,
  error_description: string,
}

export interface RegisterBody {
  username: string,
  email: string,
  password: string,
}

export interface RegisterResponse {
  userName: string,
  email: string,
  id: string,
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
