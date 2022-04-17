import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScreenId} from '../navigation/ScreenIDs';
import {ScreenProps} from '../navigation/types';
import {SharedElement} from 'react-navigation-shared-element';
import Image from '../components/Image';
import {squares} from '../styles/grid';
import {getCustomHeader} from '../navigation/headers';
import {H1} from '../components/Typography';
import {colors} from '../styles/colors';

const EventDetails = ({route, navigation}: ScreenProps<ScreenId.EventDetails>) => {


  const event = route.params.event
  navigation.setOptions(getCustomHeader({
    mid: () => <H1 style={{color: colors.white}}>{event.name}</H1>,
    backgroundColor: colors.primary,
  }))

  return (
    <View style={styles.container}>
      {/*<FocusAwareStatusBar translucent={false} backgroundColor={colors.primary} />*/}
      <SharedElement id={`item.${event.id}.cover`}>
        <Image source={{uri: event.cover}} style={[styles.image]} resizeMode={'stretch'} />
      </SharedElement>
    </View>
  );
};

export default {
  component: EventDetails,
  options: undefined,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: '100%',
    height: squares(22)
  }
});
