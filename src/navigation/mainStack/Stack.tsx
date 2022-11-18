import React from 'react';
import {RootStackParamList, ScreenId} from './ScreenIDs';
import LoginScreen from '@app/screens/LoginScreen';
import RegisterScreen from '@app/screens/RegisterScreen';
import Home from '@app/screens/Home';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import EventDetails from '@app/screens/EventDetails';
import UserProfile from '@app/screens/UserProfile';

const {Navigator, Screen} = createSharedElementStackNavigator<RootStackParamList>();

const Stack = () => {

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name={ScreenId.Home}
        {...Home}
      />
      <Screen
        name={ScreenId.Login}
        {...LoginScreen}
      />
      <Screen
        name={ScreenId.Register}
        {...RegisterScreen}
      />
      <Screen
        name={ScreenId.EventDetails}
        {...EventDetails}
        sharedElements={(route) => {
          return [`item.${route.params.event.id}.cover`];
        }}
      />
      <Screen
        name={ScreenId.UserProfile}
        {...UserProfile}
      />
    </Navigator>
  );
};

export default Stack;
