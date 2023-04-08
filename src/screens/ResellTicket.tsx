import React from 'react';
import { useResellTicketMutation } from '@app/api/useResellTicketMutation';
import BackButton from '@app/components/BackButton';
import { useToggle } from '@app/hooks/useToggle';
import { ScreenId } from '@app/navigation/mainStack/ScreenIDs';
import { getCustomHeader, getTranslucentHeader } from '@app/navigation/mainStack/headers';
import { ScreenProps, createScreen } from '@app/navigation/mainStack/types';
import { Text, TextInput, View, StyleSheet, ActivityIndicator } from 'react-native';
import Typography, { H1, typographyStyles } from '@app/components/Typography';
import { colors } from '@app/styles/colors';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import { t } from '@app/locale/useLocalization';
import { Form, Formik } from 'formik';
import { ResellCurrency } from '@app/api/models';
import Field from '@app/components/UserProfile/Field';
import Input from '@app/components/Input';
import Picker, { PickerItem } from '@app/components/Picker';
import { squares } from '@app/styles/grid';
import Button from '@app/components/Button';
import { Popup } from '@app/components/Popup';
import { useLoading } from '@app/hooks/useLoading';

type Values = {
  price: string;
  currency: ResellCurrency;
}

const initialValues = {
  price: '',
  currency: ResellCurrency.ARS,
}

function ResellTicket({ route, navigation }: ScreenProps<ScreenId.ResellTicket>) {
  const {resellTicket} = useResellTicketMutation();

  const {ticket_id, event_id} = route.params.ticket

  const [showing, toggleShowing] = useToggle();
  const {load, loading} = useLoading();

  const onSubmit = async (values: typeof initialValues) => {
    toggleShowing();
  }

  const performTicketResell = load(async (data: Values) => {
    await new Promise<void>((resolve) => {
      resellTicket({
        currency: data.currency,
        price: Number(data.price),
        ticketID: ticket_id,
        eventID: event_id,
      }).then(() => {
        toggleShowing();
        navigation.reset({
          index: 2,
          routes: [
            {name: ScreenId.Home},
            {name: ScreenId.UserProfile},
            {name: ScreenId.MyTickets},
            {name: ScreenId.Confirmation, params: {
              successText: t("resellSuccessText"),
              buttonText: t("viewMyTickets"),
              goToScreen: ScreenId.MyTickets,
            }}
          ]
        })
          }).finally(() => {
        resolve();
      });
    });
  })

  const validate = (values: typeof initialValues) => {
    const errors = {} as typeof initialValues;
    if (!values.price) {
      errors.price = t('priceRequired');
    }

    const isValidNumber = !isNaN(Number(values.price));
    if (!isValidNumber) {
      errors.price = t('priceInvalid');
    }

    return errors;
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style='dark' />
      <Typography>
        {t('resellTicketDescription')}
      </Typography>
      <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
        {({values, handleChange, handleBlur, handleSubmit, errors}) => (
          <>
            <Input
              placeholder={t('ticketPrice')}
              style={styles.input}
              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
              keyboardType='numeric'
            />
            {errors.price && <Typography style={styles.error}>{errors.price}</Typography>}
            <Picker
              style={styles.input}
              selectedValue={values.currency}
              onValueChange={(text) => handleChange('currency')(text?.toString())}>
              <PickerItem {...typographyStyles.mainText} label={t('ars')} value={ResellCurrency.ARS} />
              <PickerItem {...typographyStyles.mainText} label={t('eth')} value={ResellCurrency.ETH} />
            </Picker>
            <View style={styles.expand} />
            <Button onPress={() => handleSubmit()} title={t('resell')} />
            <Popup 
              showing={showing}
              onAttemptClose={toggleShowing}>
                <View style={styles.popup}>
                  {loading ? (
                    <ActivityIndicator color={colors.primary} />
                  ) : (
                    <>
                      <Typography>{t('areYouSureResell')}</Typography>
                      <View style={styles.popupButtons}>
                        <Button style={styles.popupButton} title={t('yes')} onPress={() => performTicketResell(values)} />
                        <Button style={styles.popupButton} title={t('no')} onPress={toggleShowing} />
                      </View>
                    </>
                  )}
                </View>
            </Popup>
          </>
        )}
      </Formik>
    </View>
  );
}

export default createScreen({
  component: ResellTicket,
  options: getCustomHeader({
    backgroundColor: colors.transparent,
    left: () => <BackButton />,
    mid: () => <H1>{t('resell')}</H1>
  })
})

const styles = StyleSheet.create({
  container: {
    padding: squares(2),
    flex: 1,
  },
  input: {
    marginTop: squares(2),
  },
  error: {
    color: colors.red
  },
  expand: {
    flex: 1,
  },
  popup: {
    padding: squares(2),
    backgroundColor: colors.white,
    marginHorizontal: squares(2),
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: squares(2),
  },
  popupButton: {
    flex: 1,
    marginHorizontal: squares(1),
  },
})