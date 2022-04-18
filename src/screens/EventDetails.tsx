import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScreenId} from '../navigation/ScreenIDs';
import {ScreenProps} from '../navigation/types';
import {SharedElement} from 'react-navigation-shared-element';
import Image from '../components/Image';
import {squares} from '../styles/grid';
import {getCustomHeader} from '../navigation/headers';
import Typography, {H1} from '../components/Typography';
import {colors} from '../styles/colors';
import Button from '../components/Button';
import {t} from 'i18n-js';
import {useLocalization} from '../locale/useLocalization';
import {SafeAreaView} from 'react-native';

const EventDetails = ({route, navigation}: ScreenProps<ScreenId.EventDetails>) => {


  const event = route.params.event
  navigation.setOptions(getCustomHeader({
    mid: () => <H1 style={{color: colors.white}}>{event.name}</H1>,
    backgroundColor: colors.primary,
  }))

  const buyTickets = () => {

  };

  return (
    <SafeAreaView style={styles.container}>
      {/*<FocusAwareStatusBar translucent={false} backgroundColor={colors.primary} />*/}
      <SharedElement id={`item.${event.id}.cover`}>
        <Image source={{uri: event.cover}} style={[styles.image]} resizeMode={'stretch'} />
      </SharedElement>
      <View style={styles.descriptionContainer}>
        <Typography>{event.description}</Typography>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={t('buyTickets')} onPress={buyTickets} />
      </View>
    </SafeAreaView>
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
  },
  descriptionContainer: {
    margin: squares(2),
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: squares(2)
  }
});
