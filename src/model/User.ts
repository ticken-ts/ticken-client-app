export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  walletAddress: string;
}

export interface CreateAccountData {
  token: string;
  addressPK: string;
}
