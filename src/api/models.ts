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
  pub_bc_address: string;

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

export interface ApiTicket {
  ticket_id:   string;
  event_id:    string;
  status:      string;
  section:     string;
  pubbc_tx_id: string;
  pvtbc_tx_id: string;
  token_id:    string;
}

