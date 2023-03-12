export interface ApiResponse<T> {
  data: T;
}

export interface ApiSection {
  event_id: string;
  name: string;
  total_tickets: number;
  price: number;
  on_chain: boolean;
}

export interface ApiEvent {
  event_id: string;
  name: string;
  description: string;
  date: string;
  on_chain: boolean;
  sections: ApiSection[];
  poster?: string;
}

export interface ApiUser {
  user_id: string;
  wallet_address: string;
  profile?: {
    first_name: string;
    last_name: string;
    email: string;
    email_verified: boolean;
  }
}
