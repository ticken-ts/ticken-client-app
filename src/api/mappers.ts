import {ApiEvent} from '@app/api/models';
import {EventModel} from '@app/model/Event';

export const toEvent = (event: ApiEvent): EventModel => ({
  id: event.event_id,
  description: "",
  name: event.name,
  startDate: event.date,
  sections: event.sections.map(section => ({
    name: section.name,
    totalTickets: section.total_tickets
  })),
  cover: event.poster
})

export const toEventList = (events: ApiEvent[]): EventModel[] => events.map(toEvent);
