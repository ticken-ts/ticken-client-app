import {ApiEvent} from '@app/api/models';
import {EventModel} from '@app/model/Event';
import {getPosterUri} from '@app/api/api';

export const toEventPoster = (poster?: string): (string | undefined) => {
  if (poster) {
    return getPosterUri(poster)
  }
  return undefined;
};

export const toEvent = (event: ApiEvent): EventModel => ({
  id: event.event_id,
  description: event.description,
  name: event.name,
  startDate: event.date,
  sections: event.sections.map(section => ({
    name: section.name,
    totalTickets: section.total_tickets
  })),
  cover: toEventPoster(event.poster)
})

export const toEventList = (events: ApiEvent[]): EventModel[] => events.map(toEvent);
