import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getCustomHeader, getTranslucentHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {colors} from '@app/styles/colors';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Typography, {H1} from '@app/components/Typography';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {t} from '@app/locale/useLocalization';
import {useGetMyTicketsQuery} from '@app/api/useGetMyTicketsQuery';
import {useEventListQuery} from '@app/api/useEventListQuery';

const MyTickets = ({navigation}: ScreenProps<ScreenId.MyTickets>) => {

  const myTickets = useGetMyTicketsQuery();
  const events = useEventListQuery();

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        style={'dark'}
        backgroundColor="transparent"
      />
      {myTickets.data &&
        <FlatList data={myTickets.data} renderItem={({item}) =>
          <View>
            <Typography>{item.ticket_id}</Typography>
          </View>
        }/>
      }
    </View>
  );
};

export default {
  component: MyTickets,
  options: getCustomHeader({
    left: () => <BackButton />,
    // right: <>...</>,
    mid: () => <H1>{t("myTickets")}</H1>,
    backgroundColor: colors.transparent,
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
