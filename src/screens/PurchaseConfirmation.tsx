import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {getCustomHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import Typography, {H1, H2, H3} from '@app/components/Typography';
import {t} from '@app/locale/useLocalization';
import {colors} from '@app/styles/colors';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import {squares} from '@app/styles/grid';
import Spacing from '@app/components/Spacing';
import Button from '@app/components/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePurchaseTicketMutation} from '@app/api/usePurchaseTicketMutation';
import { FontAwesome } from '@expo/vector-icons';

const PurchaseConfirmation = ({route, navigation}: ScreenProps<ScreenId.PurchaseConfirmation>) => {

  const {event, section} = route.params

  const {bottom} = useSafeAreaInsets();

  const {purchaseTicket, isLoading, isSuccess} = usePurchaseTicketMutation();

  const confirmPurchase = async () => {
    const res = await purchaseTicket({
      event: event,
      section: section.name,
    })
  };

  const goToMyTickets = () => {
    navigation.reset({
      index: 1,
      routes: [
        {name: ScreenId.Home},
        {name: ScreenId.UserProfile},
        {name: ScreenId.MyTickets}
      ]
    })
  };

  if (isSuccess) {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar style="dark" />
        <View style={styles.successContainer}>
          <View style={{flex: 1}}/>
          <FontAwesome name="check-circle" size={squares(10)} color={colors.secondary} />
          <Spacing v={squares(2)} />
          <H1>{t("successText")}</H1>
          <View style={{flex: 1}}/>
          <Button style={{alignSelf: 'stretch'}} title={t('viewMyTickets')} onPress={goToMyTickets} />
          <Spacing v={bottom || squares(2)} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style="dark" />
      <View style={styles.main}>
        <Spacing v={squares(4)} />
        <Typography>{t('purchaseConfirmationText')}</Typography>
        <View style={styles.detailsContainer}>
          <H2 style={{textAlign: 'center'}}>{event.name}</H2>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: squares(2)}}>
            <Typography>1x {section.name}</Typography>
            <Typography>${section.price}</Typography>
          </View>
          {/* Line separator */}
          <View style={{height: 1, backgroundColor: colors.primary, marginVertical: squares(2)}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: squares(0)}}>
            <H3>{t('total')}</H3>
            <Typography>${section.price}</Typography>
          </View>
        </View>
      </View>
      {!isLoading
        ? <Button title={t('confirm')} onPress={confirmPurchase} />
        : <Button title={t('confirm')} onPress={() => {}} />
      }
      <Spacing v={bottom || squares(2)} />
    </View>
  );
};

export default {
  component: PurchaseConfirmation,
  options: getCustomHeader({
    left: () => <BackButton />,
    mid: () => <H1>{t("purchaseConfirmation")}</H1>,
    backgroundColor: colors.transparent,
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: squares(2),
  },
  detailsContainer: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: squares(2),
    marginVertical: squares(2),
    padding: squares(2),
  },
  main: {
    flex: 1,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
