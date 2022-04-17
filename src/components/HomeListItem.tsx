import {ListRenderItem, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../styles/colors';
import {squares} from '../styles/grid';
import {shadowStyles} from '../styles/shadow';
import {EventModel} from '../model/Event';
import Image from './Image';
import React from 'react';

export const HomeListItem: ListRenderItem<EventModel> = ({item}) => {
  return (
    <TouchableOpacity style={itemStyles.card}>
      <Image source={{uri: item.cover}} style={itemStyles.cover} resizeMode={'stretch'} />
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
