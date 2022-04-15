import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, ScreenId} from './ScreenIDs';
import LoginScreen from '../screens/LoginScreen';
import {useSelector} from 'react-redux';
import {isLoggedIn} from '../redux/selectors/auth';
import RegisterScreen from '../screens/RegisterScreen';
import Home from '../screens/Home';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

const Stack = () => {
  const loggedIn = useSelector(isLoggedIn)

  return (
    <>
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name={ScreenId.Login}
        {...LoginScreen}
      />
      <Screen
        name={ScreenId.Register}
        {...RegisterScreen}

      />
      <Screen
        name={ScreenId.Home}
        {...Home}
      />
    </Navigator>
    </>
  );
};

export default Stack;
