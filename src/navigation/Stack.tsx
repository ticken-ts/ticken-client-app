import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ScreenId} from './ScreenIDs';
import LoginScreen from '../screens/LoginScreen';
import {useSelector} from 'react-redux';
import {isLoggedIn} from '../redux/selectors/auth';

const {Navigator, Screen} = createNativeStackNavigator();

const Stack = () => {
  const loggedIn = useSelector(isLoggedIn)

  return (
    <Navigator>
      <Screen
        name={ScreenId.Login}
        component={LoginScreen}
      />
    </Navigator>
  );
};

export default Stack;
