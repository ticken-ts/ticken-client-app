import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ScreenId} from './ScreenIDs';
import LoginScreen from '../screens/LoginScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const Stack = () => {
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
