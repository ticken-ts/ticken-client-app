import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getCustomHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {colors} from '@app/styles/colors';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import {H1} from '@app/components/Typography';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {t} from '@app/locale/useLocalization';
import {useGetMyTicketsQuery} from '@app/api/useGetMyTicketsQuery';
import {useEventListQuery} from '@app/api/useEventListQuery';
import {squares} from '@app/styles/grid';
import {OwnedTicket} from '@app/components/OwnedTicket';

const MyTickets = ({navigation}: ScreenProps<ScreenId.MyTickets>) => {

  const myTickets = useGetMyTicketsQuery();
  const events = useEventListQuery();

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        style={'dark'}
        backgroundColor="transparent"
      />
      {myTickets.data?.length === 0 &&
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <H1>{t("noTickets")}</H1>
        </View>
      }
      {myTickets.data &&
        <FlatList data={myTickets.data} renderItem={({item}) =>
          <OwnedTicket ticket={item} />
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
  },
});
