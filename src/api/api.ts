import {EventModel} from '@app/model/Event';
import axios, {isAxiosError} from 'axios';
import {env} from '@app/config/loadEnvironment';
import {toEventList} from '@app/api/mappers';
import {ApiEvent, ApiResponse} from '@app/api/models';
import {CreateAccountData, User} from '@app/model/User';

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

export const fetchMyUser = (token: string) => async () => {
  try {
    const user = await ticketsApi.get<ApiResponse<User>>('/users/myUser', {
      headers: {
        Authorization: token
      }
    });
    return user.data.data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return undefined;
      }
    }
    throw e;
  }
}

export const createAccount = async (data: CreateAccountData) => {
  console.log('data', data);
  const account = await ticketsApi.post<ApiResponse<User>>('/users', {
    addressPK: data.addressPK
  }, {
    headers: {
      Authorization: data.token
    }
  });
  return account.data.data;
}
