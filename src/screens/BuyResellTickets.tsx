import React from "react"
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { useSectionResells } from "@app/api/useSectionResells"
import BackButton from "@app/components/BackButton"
import { H1 } from "@app/components/Typography"
import { t } from "@app/locale/useLocalization"
import { ScreenId } from "@app/navigation/mainStack/ScreenIDs"
import { getCustomHeader } from "@app/navigation/mainStack/headers"
import { ScreenProps, createScreen } from "@app/navigation/mainStack/types"
import { colors } from "@app/styles/colors"
import { ApiResell, ApiTicket, ResellCurrency } from "@app/api/models"
import FocusAwareStatusBar from "@app/components/FocusAwareStatusBar"
import Field from "@app/components/UserProfile/Field"
import { squares } from "@app/styles/grid"
import {FontAwesome} from "@expo/vector-icons"
import Spacing from "@app/components/Spacing"

const BuyResellTickets = ({route, navigation}: ScreenProps<ScreenId.BuyResellTickets>) => {

  const {event, section} = route.params

  const {data: resellTickets, refetch, isRefetching} = useSectionResells(event.id, section.name);

  const onChosseNewTicket = () => {
    navigation.navigate(ScreenId.PurchaseConfirmation, {event, section});
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style="dark" />
      <H1>{t("newTicket")}</H1>
      <Spacing v={squares(1)} />
      <TouchableOpacity onPress={onChosseNewTicket}  style={styles.resell}>
        <Field.Field label="Price" content={`${ResellCurrency.ARS} ${section.price}`} />
        <FontAwesome name="chevron-right" size={squares(3)} color={colors.primary} />
      </TouchableOpacity>
      <Spacing v={squares(2)} />
      <H1>{t("resellTickets")}</H1>
      <Spacing v={squares(1)} />
      <FlatList refreshing={isRefetching} onRefresh={refetch} data={resellTickets} renderItem={({item}) => <ResellTicket ticket={item} />} />
    </View>
  )
}

type TicketProps = {
  ticket: ApiTicket
}

const ResellTicket = ({ticket}: TicketProps) => {

  const onChooseResell = (resell: ApiResell) => {
  }

  return (
    <View style={styles.ticketContainer}>
      {ticket.resells.map(resell => (
        <TouchableOpacity onPress={() => onChooseResell(resell)}  style={styles.resell}>
          <Field.Field label="Price" content={`${resell.currency} ${resell.price}`} />
          <FontAwesome name="chevron-right" size={squares(3)} color={colors.primary} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default createScreen({
  component: BuyResellTickets,
  options: getCustomHeader({
    left: () => <BackButton />,
    mid: () => <H1>{t('chooseSectionTicket')}</H1>,
    backgroundColor: colors.transparent,
  })
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: squares(2),
  },
  ticketContainer: {
  },
  resell: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: squares(1),
    borderRadius: squares(1),
    borderColor: colors.primary,
    borderWidth: 1,
  }
})