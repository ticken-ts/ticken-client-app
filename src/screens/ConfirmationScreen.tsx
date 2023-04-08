import BackButton from '@app/components/BackButton';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import { H1 } from '@app/components/Typography';
import { t } from '@app/locale/useLocalization';
import { getCustomHeader, getTranslucentHeader } from '@app/navigation/mainStack/headers';
import { ScreenProps, createScreen } from '@app/navigation/mainStack/types';
import { colors } from '@app/styles/colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Spacing from '@app/components/Spacing';
import Button from '@app/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { squares } from '@app/styles/grid';
import { ScreenId } from '@app/navigation/mainStack/ScreenIDs';


function ConfirmationScreen({navigation}: ScreenProps<ScreenId.Confirmation>) {

  const {bottom} = useSafeAreaInsets();

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

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style="dark" />
      <View style={styles.subContainer}>
        <FocusAwareStatusBar style="dark" />
        <View style={styles.successContainer}>
          <View style={{flex: 1}}/>
          <FontAwesome name="check-circle" size={squares(10)} color={colors.secondary} />
          <Spacing v={squares(2)} />
          <H1>{t("resellSuccessText")}</H1>
          <View style={{flex: 1}}/>
          <Button style={{alignSelf: 'stretch'}} title={t('viewMyTickets')} onPress={goToMyTickets} />
          <Spacing v={bottom || squares(2)} />
        </View>
      </View>
    </View>
  );
}

export default createScreen({
    component: ConfirmationScreen,
    options: getCustomHeader({
        left: () => <BackButton />,
        backgroundColor: colors.transparent,
        mid: () => <H1>{t('resellSuccess')}</H1>
    })
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: squares(2),
  },
  subContainer: {
    flex: 1,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
