import { ApiTicket } from '@app/api/models';
import {EventModel, SectionModel} from '@app/model/Event';
import {StackNavigationProp} from '@react-navigation/stack';

export enum ScreenId {
  Home = "Home",
  EventDetails = "EventDetails",
  UserProfile = "UserProfile",
  BuyTickets = "BuyTickets",
  PurchaseConfirmation = "PurchaseConfirmation",
  MyTickets = "MyTickets",
  OwnedTicket = "OwnedTicket",
  ResellTicket = "ResellTicket",
  ResellConfirmation = "ResellConfirmation",
}

export type RootStackParamList = {
  [ScreenId.Home]: undefined;
  [ScreenId.EventDetails]: {
    event: EventModel,
  };
  [ScreenId.UserProfile]: {
    userId?: string,
  };
  [ScreenId.BuyTickets]: {
    event: EventModel,
  },
  [ScreenId.PurchaseConfirmation]: {
    event: EventModel,
    section: SectionModel,
  },
  [ScreenId.MyTickets]: undefined,
  [ScreenId.OwnedTicket]: {
    ticket: ApiTicket,
  },
  [ScreenId.ResellTicket]: {
    ticket: ApiTicket,
  },
  [ScreenId.ResellConfirmation]: {
    ticket: ApiTicket,
    price: number,
    currency: string,
  },
}

export type NavigationTyping = StackNavigationProp<RootStackParamList>
