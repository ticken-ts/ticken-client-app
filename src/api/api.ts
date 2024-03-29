import {EventModel} from '@app/model/Event';
import axios, {isAxiosError} from 'axios';
import {env} from '@app/config/loadEnvironment';
import {toEventList, toUser} from '@app/api/mappers';
import {ApiError, ApiEvent, ApiResponse, ApiTicket, ApiUser, ResellCurrency} from '@app/api/models';
import {CreateAccountData, User} from '@app/model/User';
import {useCallback, useContext} from 'react';
import {AuthContext} from '@app/context/AuthContext';
import { apiErrorHandler } from './errorHandler';

const eventsApi = axios.create({
  baseURL: env.EVENTS_URL
})

const ticketsApi = axios.create({
  baseURL: env.TICKETS_URL,
});

eventsApi.interceptors.response.use((response) => response, apiErrorHandler);
ticketsApi.interceptors.response.use((response) => response, apiErrorHandler);

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
  console.log("Getting user with token: ", token);
  const user = await ticketsApi.get<ApiResponse<ApiUser>>('/users/myUser', {
    headers: {
      Authorization: token
    }
  });
  return toUser(user.data.data);
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

export const purchaseTicket = async (event: EventModel, section: string, token: string | null) => {
  if (!token) {
    return undefined;
  }
  const ticket = await ticketsApi.post<ApiResponse<ApiTicket>>(`/events/${event.id}/tickets`, {
    section,
  }, {
    headers: {
      Authorization: token
    }
  });
  return ticket.data?.data;
}

export const getMyTickets = async (token: string | null) => {
  if (!token) {
    return undefined;
  }
  const tickets = await ticketsApi.get<ApiResponse<ApiTicket[]>>('/events/tickets', {
    headers: {
      Authorization: token
    }
  });
  return tickets.data.data;
}

export const getEvent = async (eventId: string) => {
  const event = await eventsApi.get<ApiResponse<ApiEvent>>(`/public/events/${eventId}`);
  return event.data.data;
}

export const getMyPrivateKey = async (token: string | null) => {
  if (!token) {
    return undefined;
  }
  const privateKey = await ticketsApi.get<ApiResponse<string>>('/users/myUser/privKey', {
    headers: {
      Authorization: token
    },
    params: {
      format: "hex"
    }
  });
  return privateKey.data.data;
}

export const resellTicket = async (eventID: string, ticketID: string, price: number, token: string | null) => {
  if (!token) {
    return undefined;
  }
  const ticket = await ticketsApi.put<ApiResponse<ApiTicket>>(`/events/${eventID}/tickets/${ticketID}/resells`, {
    price,
    currency: ResellCurrency.ARS,
  }, {
    headers: {
      Authorization: token
    }
  });
  return ticket.data.data;
}

export const getSectionResells = async (eventID: string, section: string, token: string | null) => {
  if (!token) {
    return undefined;
  }
  const resells = await ticketsApi.get<ApiResponse<ApiTicket[]>>(`/events/${eventID}/tickets/resells`, {
    headers: {
      Authorization: token
    },
    params: {
      section,
    }
  });
  return resells.data.data;
}

export const purchaseResellTicket = async (eventID: string, ticketID: string, resellID: string, token: string | null) => {
  if (!token) {
    return undefined;
  }
  const ticket = await ticketsApi.post<ApiResponse<ApiTicket>>(`/events/${eventID}/tickets/${ticketID}/resells/${resellID}`, {}, {
    headers: {
      Authorization: token
    }
  });
  return ticket.data.data;
}
