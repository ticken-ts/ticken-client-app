import Typography, { H2, H3 } from '@app/components/Typography';
import { t } from '@app/locale/useLocalization';
import { EventModel } from '@app/model/Event';
import { colors } from '@app/styles/colors';
import { squares } from '@app/styles/grid';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Spacing from './Spacing';
import Button from './Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  event: EventModel
  section: {
    name: string
    price: number
  },
  buttonAction: () => void,
  disableButton?: boolean,
}

export default function PurchaseDetails({ event, section, buttonAction, disableButton = false }: Props) {
  const { bottom } = useSafeAreaInsets();
  
  return (
    <>
      <View style={styles.main}>
        <Spacing v={squares(4)} />
        <Typography>{t('purchaseConfirmationText')}</Typography>
        <View style={styles.detailsContainer}>
          <H2 style={{ textAlign: 'center' }}>{event.name}</H2>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: squares(2) }}>
            <Typography>1x {section.name}</Typography>
            <Typography>${section.price}</Typography>
          </View>
          {/* Line separator */}
          <View style={{ height: 1, backgroundColor: colors.primary, marginVertical: squares(2) }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: squares(0) }}>
            <H3>{t('total')}</H3>
            <Typography>${section.price}</Typography>
          </View>
        </View>
      </View>
      {!disableButton
        ? <Button title={t('confirm')} onPress={buttonAction} />
        : <Button title={t('confirm')} onPress={() => {}} />
      }
      <Spacing v={bottom || squares(2)} />
    </>
  );
}

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
