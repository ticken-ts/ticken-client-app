export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  walletAddress: string;
  emailVerified?: boolean;
}

export interface CreateAccountData {
  addressPK: string;
}
