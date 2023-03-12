import React from 'react';
import {Text, View, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import {Formik} from 'formik';
import Typography, {H1} from '@app/components/Typography';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {getCustomHeader, getTranslucentHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {useAuth} from '@app/hooks/useAuth';
import {SectionModel} from '@app/model/Event';
import {squares} from '@app/styles/grid';
import {colors} from '@app/styles/colors';
import {useHeaderHeight} from 'react-native-screens/native-stack';
import {t} from '@app/locale/useLocalization';
import Icon from '@expo/vector-icons/FontAwesome';

const BuyTickets = ({route, navigation}: ScreenProps<ScreenId.BuyTickets> ) => {

  const {isLoggedIn} = useAuth();

  const buyTicket = () => {

  };

  // if (!isLoggedIn) {
  //   return null
  // }
  //
  return (
    <View style={styles.container}>
      <FlatList data={route.params.event.sections} renderItem={renderSection} />
    </View>
  );
};

const renderSection: ListRenderItem<SectionModel> = ({item}) => {
  return (
    <View style={styles.section}>
      <View style={styles.texts}>
        <H1>{item.name}</H1>
        <Typography>${item.price}</Typography>
      </View>
      <Icon name={"chevron-right"} color={colors.primary} />
    </View>
  )
};

export default {
    component: BuyTickets,
    options: getCustomHeader({
        left: () => <BackButton />,
        mid: () => <H1>{t("buyTickets")}</H1>,
      backgroundColor: colors.white,
    }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: squares(2),
    borderColor: colors.primary,
    borderWidth: 1,
    marginTop: squares(2),
    marginHorizontal: squares(1),
    borderRadius: squares(1),
  },
  texts: {

  }
});
