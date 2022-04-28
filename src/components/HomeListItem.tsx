import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../styles/colors';
import {squares} from '../styles/grid';
import {shadowStyles} from '../styles/shadow';
import {EventModel} from '../model/Event';
import Image from './Image';
import React from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from '@react-navigation/native';
import {NavigationTyping, ScreenId} from '../navigation/mainStack/ScreenIDs';

export const HomeListItem = ({item}: {item: EventModel}) => {

  const navigation = useNavigation<NavigationTyping>()

  const goToDetails = () => {
    navigation.navigate(ScreenId.EventDetails, {event: item})
  };

  return (
    <TouchableOpacity style={itemStyles.card} onPress={goToDetails}>
      <SharedElement id={`item.${item.id}.cover`}>
        <Image source={{uri: item.cover}} style={itemStyles.cover} resizeMode={'stretch'} />
      </SharedElement>
      {/*<H2 style={itemStyles.title}>{item.name}</H2>*/}
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
