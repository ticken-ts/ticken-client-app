import {EventModel} from '@app/model/Event';
import {StackNavigationProp} from '@react-navigation/stack';

export enum ScreenId {
  Login = "Login",
  Register = "Register",
  Home = "Home",
  EventDetails = "EventDetails",
  UserProfile = "UserProfile",
}

export type RootStackParamList = {
  [ScreenId.Login]: undefined;
  [ScreenId.Register]: undefined;
  [ScreenId.Home]: undefined;
  [ScreenId.EventDetails]: {
    event: EventModel,
  };
  [ScreenId.UserProfile]: {
    userId?: string,
  }
}

export type NavigationTyping = StackNavigationProp<RootStackParamList>
