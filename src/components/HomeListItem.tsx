import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '@app/styles/colors';
import {squares} from '@app/styles/grid';
import {shadowStyles} from '@app/styles/shadow';
import {EventModel} from '@app/model/Event';
import Image from '@app/components/Image';
import React from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from '@react-navigation/native';
import {NavigationTyping, ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {H2} from '@app/components/Typography';
import EventPoster from '@app/components/EventPoster';

export const HomeListItem = ({item}: {item: EventModel}) => {

  const navigation = useNavigation<NavigationTyping>()

  const goToDetails = () => {
    navigation.navigate(ScreenId.EventDetails, {event: item})
  };

  return (
    <TouchableOpacity style={itemStyles.card} onPress={goToDetails}>
      <SharedElement id={`item.${item.id}.cover`}>
        <EventPoster source={{uri: item.cover}} style={itemStyles.cover} resizeMode={'cover'} />
      </SharedElement>
      <H2 style={itemStyles.title}>{item.name}</H2>
    </TouchableOpacity>
  );
};

const itemStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: squares(1),
    height: squares(20),
    margin: squares(2),
    marginBottom: 0,
    ...shadowStyles.normal,
    overflow: 'hidden',
  },
  title: {
    color: colors.white,
    position: 'absolute',
    bottom: 0,
    margin: squares(1),
    ...shadowStyles.normal,
  },
  cover: {},
});
