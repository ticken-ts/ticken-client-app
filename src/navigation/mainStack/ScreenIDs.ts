import {EventModel} from '@app/model/Event';
import {StackNavigationProp} from '@react-navigation/stack';

export enum ScreenId {
  Home = "Home",
  EventDetails = "EventDetails",
  UserProfile = "UserProfile",
}

export type RootStackParamList = {
  [ScreenId.Home]: undefined;
  [ScreenId.EventDetails]: {
    event: EventModel,
  };
  [ScreenId.UserProfile]: {
    userId?: string,
  }
}

export type NavigationTyping = StackNavigationProp<RootStackParamList>
