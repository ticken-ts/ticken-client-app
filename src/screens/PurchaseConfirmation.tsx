import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {getCustomHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {H1} from '@app/components/Typography';
import {t} from '@app/locale/useLocalization';
import {colors} from '@app/styles/colors';

const PurchaseConfirmation = ({route, navigation}: ScreenProps<ScreenId.PurchaseConfirmation>) => {

  const {event, section} = route.params

  return (
    <View style={styles.container}>
      <Text></Text>
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
  },
});
