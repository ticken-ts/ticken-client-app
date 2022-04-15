import React from 'react';
import {SafeAreaView} from 'react-native';
import {ScreenProps} from '../navigation/types';
import {ScreenId} from '../navigation/ScreenIDs';
import {getCustomHeader} from '../navigation/headers';
import {colors} from '../styles/colors';
import Typography, {H1} from '../components/Typography';

const Home = ({}: ScreenProps<ScreenId.Home>) => {
  return (
    <SafeAreaView>
      <Typography>Home</Typography>
    </SafeAreaView>
  );
};

export default {
  component: Home,
  options: getCustomHeader({
    mid: () => <H1 style={{color: colors.white}}>Upcoming Events</H1>,
    backgroundColor: colors.primary
  })
};
