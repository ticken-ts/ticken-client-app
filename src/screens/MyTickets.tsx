import React from 'react';
import {FlatList, Modal, StyleSheet, View} from 'react-native';
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
import {ApiTicket} from '@app/api/models';
import {useEventQuery} from '@app/api/useEventQuery';
import {squares} from '@app/styles/grid';
import {DateTime} from "luxon";
import {useToggle} from '@app/hooks/useToggle';

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
          <OwnedTicket ticket={item} />
        }/>
      }
    </View>
  );
};

type TicketProps = {
  ticket: ApiTicket;
}
const OwnedTicket = ({ticket}: TicketProps) => {

  const event = useEventQuery(ticket.event_id);

  if (!event.data) return (<></>);

  const [showing, toggleShowing] = useToggle();

  return (
    <View style={styles.ticket}>
      <H1>{event.data.name}</H1>
      <Typography>{DateTime.fromISO(event.data.date).toFormat("DD")}</Typography>
      <Typography>{DateTime.fromISO(event.data.date).toFormat("HH:mm")}</Typography>
      <Typography>{ticket.section}</Typography>
    </View>
  )
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
  ticket: {
    backgroundColor: colors.white,
    marginHorizontal: squares(2),
    marginVertical: squares(1),
    padding: squares(2),
  }
});
