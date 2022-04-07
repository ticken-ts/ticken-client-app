import React from 'react';
import {Text, View} from 'react-native';
import {ScreenId} from '../navigation/ScreenIDs';
import {ScreenProps} from '../navigation/types';

const LoginScreen = ({navigation}: ScreenProps<ScreenId.Login>) => {

  navigation.setOptions({
    headerShown: false,
  })

  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;
