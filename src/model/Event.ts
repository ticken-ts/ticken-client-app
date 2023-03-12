export interface EventModel {
  id: string,
  startDate: string,
  description: string,
  name: string,
  cover?: string,
  sections: SectionModel[]
}

export interface SectionModel {
  name: string,
  totalTickets: number,
  price: number,
}
