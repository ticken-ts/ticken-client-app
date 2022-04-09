import React from 'react';
import {Text, View} from 'react-native';
import {getHiddenHeader} from '../navigation/headers';

const RegisterScreen = () => {
  return (
    <View>
      <Text>RegisterScreen</Text>
    </View>
  );
};

export default {
  component: RegisterScreen,
  options: getHiddenHeader()
};
