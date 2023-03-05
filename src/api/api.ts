import {EventModel} from '@app/model/Event';
import axios from 'axios';
import {env} from '@app/config/loadEnvironment';
import {toEventList} from '@app/api/mappers';
import {ApiEvent, ApiResponse} from '@app/api/models';

const eventsApi = axios.create({
  baseURL: env.EVENTS_URL
})

const ticketsApi = axios.create({
  baseURL: env.TICKETS_URL
});

export const getPosterUri = (poster?: string): string | undefined => {
  if (poster) {
    return `${env.EVENTS_URL}/assets/${poster}`;
  }
  return undefined;
}

export const fetchEvents = async (): Promise<EventModel[]> => {
  const events = await eventsApi.get<ApiResponse<ApiEvent[]>>('/public/events');
  return toEventList(events.data.data)
};
