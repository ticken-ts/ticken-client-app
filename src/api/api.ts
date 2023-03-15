import {EventModel} from '@app/model/Event';
import axios, {isAxiosError} from 'axios';
import {env} from '@app/config/loadEnvironment';
import {toEventList, toUser} from '@app/api/mappers';
import {ApiEvent, ApiResponse, ApiUser} from '@app/api/models';
import {CreateAccountData, User} from '@app/model/User';
import {useCallback, useContext} from 'react';
import {AuthContext} from '@app/context/AuthContext';

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
}

export const fetchMyUser = async (token: string | null) => {
  if (!token) {
    return undefined;
  }
  try {
    console.log("Getting user with token: ", token);
    const user = await ticketsApi.get<ApiResponse<ApiUser>>('/users/myUser', {
      headers: {
        Authorization: token
      }
    });
    return toUser(user.data.data);
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return undefined;
      }
    }
    throw e;
  }
}

export const createAccount = async (data: CreateAccountData, token: string|null) => {
  if (!token) {
    return undefined;
  }
  console.log('data', data);
  const account = await ticketsApi.post<ApiResponse<User>>('/users', {
    addressPK: data.addressPK
  }, {
    headers: {
      Authorization: token
    }
  });
  return account.data.data;
}
