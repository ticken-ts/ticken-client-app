import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenId} from '../navigation/ScreenIDs';
import {ScreenProps} from '../navigation/types';
import {SharedElement} from 'react-navigation-shared-element';
import Image from '../components/Image';
import {squares} from '../styles/grid';
import {getTranslucentHeader} from '../navigation/headers';
import Typography from '../components/Typography';
import Button from '../components/Button';
import {t} from 'i18n-js';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';

const EventDetails = ({route}: ScreenProps<ScreenId.EventDetails>) => {

  const {bottom} = useSafeAreaInsets()

  const event = route.params.event

  const buyTickets = () => {

  };

  return (
    <View style={[styles.container, {marginBottom: bottom || squares(2)}]} >
      <FocusAwareStatusBar translucent style={'light'} />
      <SharedElement id={`item.${event.id}.cover`}>
        <Image source={{uri: event.cover}} style={[styles.image]} resizeMode={'stretch'} />
      </SharedElement>
      <View style={styles.descriptionContainer}>
        <Typography>{event.description}</Typography>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={t('buyTickets')} onPress={buyTickets} />
      </View>
    </View>
  );
};

export default {
  component: EventDetails,
  options: getTranslucentHeader({
    left: () => <BackButton />
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: '100%',
    height: squares(22)
  },
  descriptionContainer: {
    margin: squares(2),
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: squares(2)
  }
});
