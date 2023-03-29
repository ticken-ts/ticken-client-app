import {ApiTicket} from '@app/api/models';
import {useEventQuery} from '@app/api/useEventQuery';
import {useToggle} from '@app/hooks/useToggle';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Typography, {H1, H2} from '@app/components/Typography';
import {DateTime} from 'luxon';
import React, {useState} from 'react';
import {colors} from '@app/styles/colors';
import {squares} from '@app/styles/grid';
import EventPoster from '@app/components/EventPoster';
import {getPosterUri} from '@app/api/api';
import Button from '@app/components/Button';
import { useLoading } from '@app/hooks/useLoading';
import { QRCode } from '@app/components/QRCode';
import { t } from '@app/locale/useLocalization';
import { usePrivateKeyQuery } from '@app/api/usePrivateKeyQuery';
import { createTicketHash } from '@app/crypto/createTicketHash';

type TicketProps = {
  ticket: ApiTicket;
}
export const OwnedTicket = ({ticket}: TicketProps) => {

  const {data: event} = useEventQuery(ticket.event_id);
  const {data: myPrivateKey} = usePrivateKeyQuery();
  const [showing, toggleShowing] = useToggle();
  const {load, loading} = useLoading()

  const [code, setCode] = useState('');

  const onRefreshCode = load(async () => {
    if (!event) return;
    if (!myPrivateKey) return;
    
    const hash = await createTicketHash(ticket, event, myPrivateKey);
    
    setCode(hash);
  })

  if (!event) return (<></>);

  return (
    <TouchableOpacity onPress={toggleShowing} style={styles.ticket}>
      <EventPoster 
        resizeMode={"cover"} 
        style={styles.poster} 
        source={{uri: getPosterUri(event.poster)}}
      />
      <H1>{event.name}</H1>
      <Typography>{DateTime.fromISO(event.date).toFormat('DD')}</Typography>
      <Typography>{DateTime.fromISO(event.date).toFormat('HH:mm')}</Typography>
      <Typography>{ticket.section}</Typography>
      <Modal animationType={"slide"} style={styles.modal} visible={showing} transparent>
        <View style={styles.modalBackground}>
          <TouchableOpacity onPress={toggleShowing} style={styles.modalBackgroundFill} />
          <View style={styles.modalContent}>
            <H2 style={styles.QRTitle}>{t('qrTitle')}</H2>
            <QRCode code={code} />
            <Button style={styles.codeButton} title={"Refresh Code"} onPress={onRefreshCode} />
          </View>
        </View>
      </Modal>
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
});

