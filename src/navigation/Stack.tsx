import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ScreenId} from './ScreenIDs';
import LoginScreen from '../screens/LoginScreen';
import {useSelector} from 'react-redux';
import {isLoggedIn} from '../redux/selectors/auth';
import {RootStackParamList} from './types';
import RegisterScreen from '../screens/RegisterScreen';
import {StatusBar} from 'react-native';
import Home from '../screens/Home';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
  const loggedIn = useSelector(isLoggedIn)

  return (
    <>
    <StatusBar barStyle={'dark-content'} translucent backgroundColor={'#00000000'} />
    <Navigator>
      <Screen
        name={ScreenId.Login}
        component={LoginScreen}
      />
      <Screen
        name={ScreenId.Register}
        component={RegisterScreen}
      />
      <Screen
        name={ScreenId.Home}
        component={Home}
      />
    </Navigator>
    </>
  );
};

export default Stack;
