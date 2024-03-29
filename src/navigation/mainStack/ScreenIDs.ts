import { ApiEvent, ApiResell, ApiTicket } from '@app/api/models';
import {EventModel, SectionModel} from '@app/model/Event';
import {StackNavigationProp} from '@react-navigation/stack';

export enum ScreenId {
  Home = "Home",
  EventDetails = "EventDetails",
  UserProfile = "UserProfile",
  BuyTickets = "BuyTickets",
  PurchaseConfirmation = "PurchaseConfirmation",
  PurchaseResellConfirmation = "PurchaseResellConfirmation",
  MyTickets = "MyTickets",
  OwnedTicket = "OwnedTicket",
  ResellTicket = "ResellTicket",
  Confirmation = "Confirmation",
  BuyResellTickets = "BuyResellTickets",
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
    section: {
      price: number,
      name: string,
    },
  },
  [ScreenId.PurchaseResellConfirmation]: {
    event: EventModel,
    section: {
      price: number,
      name: string,
    },
    ticket: ApiTicket,
    resell: ApiResell,
  },
  [ScreenId.MyTickets]: undefined,
  [ScreenId.OwnedTicket]: {
    ticket: ApiTicket,
  },
  [ScreenId.ResellTicket]: {
    ticket: ApiTicket,
  },
  [ScreenId.Confirmation]: {
    successText: string,
    buttonText: string,
    goToScreen: ScreenId,
  },
  [ScreenId.BuyResellTickets]: {
    event: EventModel,
    section: SectionModel,
  }
}

export type NavigationTyping = StackNavigationProp<RootStackParamList>
