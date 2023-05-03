import {ApiTicket, EventStatus} from '@app/api/models';
import {useEventQuery} from '@app/api/useEventQuery';
import {useToggle} from '@app/hooks/useToggle';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Typography, {H1, H2, H3} from '@app/components/Typography';
import {DateTime} from 'luxon';
import React, {useState} from 'react';
import {colors} from '@app/styles/colors';
import {squares} from '@app/styles/grid';
import EventPoster from '@app/components/EventPoster';
import {getPosterUri} from '@app/api/api';
import { NavigationTyping, ScreenId } from '@app/navigation/mainStack/ScreenIDs';
import { useNavigation } from '@react-navigation/native';
import { t } from '@app/locale/useLocalization';

type TicketProps = {
  ticket: ApiTicket;
}
export const OwnedTicket = ({ticket}: TicketProps) => {
  const {data: event} = useEventQuery(ticket.event_id);
  const navigation = useNavigation<NavigationTyping>();

  const goToTicket = () => {
    navigation.navigate(ScreenId.OwnedTicket, {ticket});
  };

  if (!event) return (<></>
  );

  return (
    <TouchableOpacity onPress={goToTicket} style={styles.ticket}>
      <EventPoster 
        resizeMode={"cover"} 
        style={styles.poster} 
        source={{uri: getPosterUri(event.poster)}}
        />
      <H1>{event.name}</H1>
      <Typography>{DateTime.fromISO(event.date).toFormat('DD')}</Typography>
      <Typography>{DateTime.fromISO(event.date).toFormat('HH:mm')}</Typography>
      <Typography>{ticket.section}</Typography>
        {ticket.resells.length > 0 && (
          <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: colors.primary, padding: squares(1)}}>
            <Typography style={{color: colors.white}}>{t('inResell')}</Typography>
          </View>
        )}
        {event.status === EventStatus.FINISHED && (
          <View style={{position: 'absolute', top: 0, right: 0, backgroundColor: colors.primary, padding: squares(1)}}>
            <Typography style={{color: colors.white}}>{t('finished')}</Typography>
          </View>          
        )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ticket: {
    backgroundColor: colors.white,
    marginHorizontal: squares(2),
    marginVertical: squares(1),
    padding: squares(2),
  },
  modal: {
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    flex: 1,
  },
  modalBackgroundFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.text,
    opacity: 0.5,
  },
  modalContent: {
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    marginHorizontal: squares(2),
    marginVertical: squares(1),
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: squares(1),
  },
  poster: {
    width: '100%',
    aspectRatio: 23/9,
    marginBottom: squares(2),
  },
  codeButton: {
    margin: squares(1),
  },
  qrCode: {
    alignItems: 'center',
    margin: squares(1),
  },
  QRTitle: {
    textAlign: 'center',
    marginTop: squares(2),
  },
  expiresInContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  expiresIn: {
    textAlign: 'center',
  },
  expired: {
    textAlign: 'center',
    color: colors.red,
  },
  expiresInNumber: {
    marginLeft: squares(1),
    width: squares(6),
    textAlign: 'left',
  }
});

