import React from 'react';
import {FlatList, ListRenderItem, StyleSheet, TouchableOpacity, View} from 'react-native';
import Typography, {H1} from '@app/components/Typography';
import {NavigationTyping, RootStackParamList, ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {ScreenProps, StackScreenProps} from '@app/navigation/mainStack/types';
import {getCustomHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {EventModel, SectionModel} from '@app/model/Event';
import {squares} from '@app/styles/grid';
import {colors} from '@app/styles/colors';
import {t} from '@app/locale/useLocalization';
import Icon from '@expo/vector-icons/FontAwesome';
import LoginWall from '@app/components/LoginWall';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import {useNavigation} from '@react-navigation/native';

const BuyTickets = ({route, navigation}: ScreenProps<ScreenId.BuyTickets> ) => {

  const event = route.params.event;

  const buyTicket = () => {

  };

  return (
    <LoginWall style={styles.container}>
      {() => (
        <View style={styles.container}>
          <FocusAwareStatusBar style="dark" />
          <FlatList data={route.params.event.sections} renderItem={({item}) => <Section event={event} section={item} />} />
        </View>
      )}
    </LoginWall>
  );
};

type SectionProps = {
  section: SectionModel,
  event: EventModel,
}

const Section: React.FC<SectionProps> = ({section, event}) => {

  const navigation = useNavigation<NavigationTyping>();

  const navigateToPurchaseConfirmation = () => {

    navigation.reset({
      index: 2,
      routes: [
        {name: ScreenId.Home},
        {name: ScreenId.EventDetails, params: {event}},
        {name: ScreenId.PurchaseConfirmation, params: {event, section}}
      ]
    })
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={navigateToPurchaseConfirmation} style={styles.section}>
      <View style={styles.texts}>
        <H1>{section.name}</H1>
        <Typography>${section.price}</Typography>
      </View>
      <Icon name={"chevron-right"} color={colors.primary} />
    </TouchableOpacity>
  )
};

export default {
    component: BuyTickets,
    options: getCustomHeader({
      left: () => <BackButton />,
      mid: () => <H1>{t("buyTickets")}</H1>,
      backgroundColor: colors.transparent,
    }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.transparent,
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
