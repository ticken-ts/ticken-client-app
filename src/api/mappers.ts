import {ApiEvent, ApiUser} from '@app/api/models';
import {EventModel} from '@app/model/Event';
import {getPosterUri} from '@app/api/api';
import {User} from '@app/model/User';

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
    totalTickets: section.total_tickets,
    price: section.price
  })),
  cover: toEventPoster(event.poster)
})

export const toEventList = (events: ApiEvent[]): EventModel[] => events.map(toEvent);

export const toUser = (user: ApiUser): User => ({
  id: user.user_id,
  walletAddress: user.wallet_address,
  email: user.profile?.email,
  firstName: user.profile?.first_name,
  lastName: user.profile?.last_name,
  emailVerified: user.profile?.email_verified
})
