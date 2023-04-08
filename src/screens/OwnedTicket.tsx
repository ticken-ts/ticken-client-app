import {ApiTicket, EventStatus} from '@app/api/models';
import {useEventQuery} from '@app/api/useEventQuery';
import {useToggle} from '@app/hooks/useToggle';
import {FlatList, Modal, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Typography, {H1, H2, H3, Title} from '@app/components/Typography';
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
import { ScreenProps } from '@app/navigation/mainStack/types';
import { ScreenId } from '@app/navigation/mainStack/ScreenIDs';
import { getCustomHeader, getTranslucentHeader } from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import { ContextMenu } from '@app/components/ContextMenu';
import Field from '@app/components/UserProfile/Field';
import { useResellTicketMutation } from '@app/api/useResellTicketMutation';
import Spacing from '@app/components/Spacing';

export const OwnedTicket = ({navigation, route}: ScreenProps<ScreenId.OwnedTicket>) => {

  const ticket = route.params.ticket;

  const dispatch = useAppDispatch();
  const {data: event} = useEventQuery(ticket.event_id);
  const {data: myPrivateKey} = usePrivateKeyQuery();
  const {load, loading} = useLoading();

  const isReselling = ticket.resells.length > 0;

  const now = useTime(1000);

  const qrData = useSelector(selectQRCode(ticket.ticket_id))
  const expiresIn = qrData?.expiresAtMillis 
    ? DateTime.fromMillis(qrData.expiresAtMillis).diff(DateTime.fromMillis(now)).toFormat('mm:ss')
    : '00:00';
  const expired = qrData?.expiresAtMillis && now > qrData.expiresAtMillis;

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
    
    const {signature, expirationDateSeconds} = await createTicketHash(ticket, event, myPrivateKey);
    
    setCode(signature, expirationDateSeconds * 1000);
  })

  const onPressResell = () => {
    navigation.navigate(ScreenId.ResellTicket, {ticket});
  }

  if (!event) return (<></>);

  return (
    <ScrollView style={styles.container}>
      <FocusAwareStatusBar style='dark' />

      {event.status === EventStatus.RUNNING && 
        <View style={styles.QRContainer}>
          <View style={styles.eventInfo}>
            <H2 style={styles.QRTitle}>{t('qrTitle')}</H2>
          </View>
          <QRCode code={qrData?.data || ""} loading={loading} />
          <View style={styles.expiresInContainer}>
            {expired ? (
              <H3 style={styles.expired}>{t('expired')}</H3>
            ) : (
              <>
                <H3 style={styles.expiresIn}>
                  {t('expiresIn')}:
                </H3>
                <View style={styles.expiresInNumber}>
                  <Typography>{expiresIn}</Typography>
                </View>
              </>
            )}
          </View>  
          <Button style={styles.codeButton} title={t("refreshCode")} onPress={onRefreshCode} />
        </View>
      }

      {isReselling && event.status === EventStatus.ON_SALE && (
        <View style={styles.resellingInfo}>
          <H1>{t('resellingTicket')}</H1>
          {ticket.resells.map(item => (
            <View key={item.currency} style={styles.resellItem}>
              <Field.Field style={styles.resellDataTitle} label={"Price"} content={'$' + ticket.resells[0].price.toString()} />
              <Spacing v={squares(1)} />
              <Field.Field style={styles.resellDataTitle} label={"Currency"} content={ticket.resells[0].currency} />
            </View>
          ))}
        </View>
      )}

      <View style={styles.ticketInfo}>
        <EventPoster
          source={{uri: getPosterUri(event.poster)}}
          resizeMode="cover"
          style={styles.poster}
        />
        <Title>{event.name}</Title>

        <Field.Field style={styles.dataTitle} label={"Section"} content={ticket.section} />
        <Field.Field style={styles.dataTitle} label={"Date"} content={DateTime.fromISO(event.date).toFormat("DD, HH:MM")} />
        <Field.Field copiable style={styles.dataTitle} label={"Contract Address"} content={event.pub_bc_address} />
        <Field.Field copiable style={styles.dataTitle} label={"Token ID"} content={ticket.token_id} />

      </View>
      {event.status === EventStatus.ON_SALE && !isReselling &&
        <Button style={styles.resellButton} title={t("resell")} onPress={onPressResell} />
      }
    </ScrollView>
  )
}

export default {
  component: OwnedTicket,
  options: getCustomHeader({
    left: () => <BackButton />,
    // right: <>...</>,
    mid: () => <H1>{t("ownedTicket")}</H1>,
    backgroundColor: colors.transparent,
  })
};

const styles = StyleSheet.create({
  ticket: {
    backgroundColor: colors.white,
    marginHorizontal: squares(2),
    marginVertical: squares(1),
    padding: squares(2),
  },
  container: {
    flex: 1,
  },
  QRContainer: {
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    marginHorizontal: squares(2),
    marginVertical: squares(1),
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: squares(1),
  },
  eventInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: squares(2),
  },
  codeButton: {
    margin: squares(1),
  },
  resellButton: {
    margin: squares(2),
  },
  qrCode: {
    alignItems: 'center',
    margin: squares(1),
  },
  QRTitle: {
    textAlign: 'center',
    textAlignVertical: 'center',
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
  },
  ticketInfo: {
    backgroundColor: colors.white,
    marginHorizontal: squares(2),
    marginVertical: squares(1),
    padding: squares(2),
  },
  dataTitle: {
    marginTop: squares(2),
  },
  poster: {
    aspectRatio: 21/9
  },
  resellingInfo: {
    backgroundColor: colors.white,
    marginHorizontal: squares(2),
    marginVertical: squares(1),
    padding: squares(2),
  },
  resellItem: {
    marginVertical: squares(1),
    borderRadius: squares(1),
    padding: squares(1),
    borderWidth: 1,
    borderColor: colors.primary,
  },
  resellDataTitle: {

  },
});

