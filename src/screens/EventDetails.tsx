import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {SharedElement} from 'react-navigation-shared-element';
import Image from '@app/components/Image';
import {squares} from '@app/styles/grid';
import {getTranslucentHeader} from '@app/navigation/mainStack/headers';
import Typography from '@app/components/Typography';
import Button from '@app/components/Button';
import {t} from 'i18n-js';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackButton from '@app/components/BackButton';

const EventDetails = ({route, navigation}: ScreenProps<ScreenId.EventDetails>) => {

  const {bottom} = useSafeAreaInsets()

  const event = route.params.event

  const buyTickets = () => {
    navigation.navigate(ScreenId.BuyTickets, {event});
  };

  return (
    <View style={[styles.container, {marginBottom: bottom || squares(2)}]}>
      <FocusAwareStatusBar translucent style={'light'} />
      <SharedElement id={`item.${event.id}.cover`}>
        <Image source={{uri: event.cover}} style={[styles.image]} resizeMode={'cover'} />
      </SharedElement>
      <View style={styles.descriptionContainer}>
        <ScrollView>
          <Typography>{event.description}</Typography>
        </ScrollView>
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
