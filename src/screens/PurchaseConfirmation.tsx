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
import PurchaseDetails from '@app/components/PurchaseDetails';
import Toast from 'react-native-root-toast';
import { ApiError } from '@app/api/models';

const PurchaseConfirmation = ({route, navigation}: ScreenProps<ScreenId.PurchaseConfirmation>) => {

  const {event, section} = route.params

  const {purchaseTicket, isLoading} = usePurchaseTicketMutation();

  const confirmPurchase = async () => {
    try {
      const res = await purchaseTicket({
        event: event,
        section: section.name,
      })
      if (res) {
        navigation.reset({
          index: 1,
          routes: [
            {name: ScreenId.Home},
            {name: ScreenId.EventDetails, params: {event: event}},
            {name: ScreenId.Confirmation, params: {
              successText: t('successText'),
              buttonText: t('viewMyTickets'),
              goToScreen: ScreenId.MyTickets,
            }},
          ]
        })
      }
    } catch (e) {
      const error = e as ApiError
      Toast.show(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style="dark" />
      <PurchaseDetails event={event} section={section} buttonAction={confirmPurchase} disableButton={isLoading} />
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
