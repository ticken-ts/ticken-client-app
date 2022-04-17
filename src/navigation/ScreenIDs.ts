import {EventModel} from '../model/Event';
import {StackNavigationProp} from '@react-navigation/stack';

export enum ScreenId {
  Login = "Login",
  Register = "Register",
  Home = "Home",
  EventDetails = "EventDetails"
}

export type RootStackParamList = {
  [ScreenId.Login]: undefined;
  [ScreenId.Register]: undefined;
  [ScreenId.Home]: undefined;
  [ScreenId.EventDetails]: {
    event: EventModel,
  };
}

export type NavigationTyping = StackNavigationProp<RootStackParamList>
