import React from 'react';
import {Text, View} from 'react-native';
import {ScreenProps} from '../navigation/types';
import {ScreenId} from '../navigation/ScreenIDs';

const Home = ({}: ScreenProps<ScreenId.Home>) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
