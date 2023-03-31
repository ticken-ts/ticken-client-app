import {ApiTicket} from '@app/api/models';
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
import Button from '@app/components/Button';
import { useLoading } from '@app/hooks/useLoading';
import { QRCode } from '@app/components/QRCode';
import { t } from '@app/locale/useLocalization';
import { usePrivateKeyQuery } from '@app/api/usePrivateKeyQuery';
import { createTicketHash } from '@app/crypto/createTicketHash';
import { useSelector } from 'react-redux';
import { selectQRCode } from '@app/redux/selectors/qrCodes';
import useAppDispatch from '@app/hooks/useDispatch';
import { addQRCode } from '@app/redux/reducers/qrCodes';
import { useTime } from '@app/hooks/useTime';

type TicketProps = {
  ticket: ApiTicket;
}
export const OwnedTicket = ({ticket}: TicketProps) => {

  const {data: event} = useEventQuery(ticket.event_id);
  const {data: myPrivateKey} = usePrivateKeyQuery();
  const [showing, toggleShowing] = useToggle();
  const {load, loading} = useLoading()

  const qrData = useSelector(selectQRCode(ticket.ticket_id))
  const dispatch = useAppDispatch();

  const setCode = (code: string, expirationDateMillis: number) => {
    dispatch(addQRCode({
      data: code,
      id: ticket.ticket_id,
      expiresAtMillis: expirationDateMillis,
    }))
  }

  const onRefreshCode = load(async () => {
    if (!event) return;
    if (!myPrivateKey) return;
    
    const {signature, expirationDateMillis} = await createTicketHash(ticket, event, myPrivateKey);
    
    setCode(signature, expirationDateMillis);
  })

  const now = useTime(1000);

  const expiresIn = qrData?.expiresAtMillis 
    ? DateTime.fromMillis(qrData.expiresAtMillis).diff(DateTime.fromMillis(now)).toFormat('mm:ss')
    : "00:00"

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
            <QRCode code={qrData?.data || ""} loading={loading} />
            <View style={styles.expiresInContainer}>
              <H3 style={styles.expiresIn}>
                {t('expiresIn')}:
              </H3>
              <View style={styles.expiresInNumber}>
                <Typography>{expiresIn}</Typography>
              </View>
            </View>  
            <Button style={styles.codeButton} title={t("refreshCode")} onPress={onRefreshCode} />
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
  expiresInContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  expiresIn: {
    textAlign: 'center',
  },
  expiresInNumber: {
    marginLeft: squares(1),
    width: squares(6),
    textAlign: 'left',
  }
});

