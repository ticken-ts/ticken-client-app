import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {getCustomHeader} from '@app/navigation/mainStack/headers';
import {colors} from '@app/styles/colors';
import {H1} from '@app/components/Typography';
import {EventModel} from '@app/model/Event';
import {HomeListItem} from '@app/components/HomeListItem';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import {t} from '@app/locale/useLocalization';
import Ionicons from '@expo/vector-icons/Ionicons';
import {squares} from '@app/styles/grid';
import {useQuery} from 'react-query';
import {fetchEvents} from '@app/api/api';

const pageSize = 4;

const Home = ({navigation}: ScreenProps<ScreenId.Home>) => {

  const goToProfile = () => {
    navigation.navigate(ScreenId.UserProfile, {})
  };

  useEffect(
    () => navigation.setOptions(getCustomHeader({
      mid: () => <H1 style={{color: colors.white}}>{t('homeTitle')}</H1>,
      right: () => (
        <Ionicons
          name={'person-circle'}
          color={colors.white}
          style={styles.profileIcon}
          onPress={goToProfile}
          size={squares(3)}
        />
      ),
      backgroundColor: colors.primary
    })),
    []
  )

  const {isLoading, isError, data, error, isFetching, refetch} = useQuery<EventModel[]>('events', fetchEvents)

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar translucent style={'light'} />
      <FlatList
        style={styles.scroll}
        refreshControl={<RefreshControl refreshing={isLoading || isFetching} onRefresh={refetch} /> }
        data={data}
        onEndReachedThreshold={0.2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <HomeListItem item={item} />}
      />
    </View>
  );
};

export default {
  component: Home,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    // backgroundColor: colors.secondary
  },
  profileIcon: {
    marginRight: squares(1)
  }
});

