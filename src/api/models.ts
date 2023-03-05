export interface ApiResponse<T> {
  data: T;
}

export interface ApiSection {
  event_id: string;
  name: string;
  total_tickets: number;
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
