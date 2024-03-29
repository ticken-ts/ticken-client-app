import React from 'react';
import {RootStackParamList, ScreenId} from './ScreenIDs';
import Home from '@app/screens/Home';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import EventDetails from '@app/screens/EventDetails';
import UserProfile from '@app/screens/UserProfile';
import BuyTickets from '@app/screens/BuyTickets';
import PurchaseConfirmation from '@app/screens/PurchaseConfirmation';
import MyTickets from '@app/screens/MyTickets';
import OwnedTicket from '@app/screens/OwnedTicket';
import ResellTicket from '@app/screens/ResellTicket';
import ConfirmationScreen from '@app/screens/ConfirmationScreen';
import BuyResellTickets from '@app/screens/BuyResellTickets';
import PurchaseResellConfirmation from '@app/screens/PurchaseResellConfirmation';

const {Navigator, Screen} = createSharedElementStackNavigator<RootStackParamList>();

const Stack = () => {

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name={ScreenId.Home}
        {...Home}
      />
      <Screen
        name={ScreenId.EventDetails}
        {...EventDetails}
        sharedElements={(route) => {
          return [`item.${route.params.event.id}.cover`];
        }}
      />
      <Screen
        name={ScreenId.UserProfile}
        {...UserProfile}
      />
      <Screen
        name={ScreenId.BuyTickets}
        {...BuyTickets}
      />
      <Screen
        name={ScreenId.PurchaseConfirmation}
        {...PurchaseConfirmation}
      />
      <Screen
        name={ScreenId.PurchaseResellConfirmation}
        {...PurchaseResellConfirmation}
      />
      <Screen
        name={ScreenId.MyTickets}
        {...MyTickets}
      />
      <Screen
        name={ScreenId.OwnedTicket}
        {...OwnedTicket}
      />
      <Screen
        name={ScreenId.ResellTicket}
        {...ResellTicket}
      />
      <Screen
        name={ScreenId.Confirmation}
        {...ConfirmationScreen}
      />
      <Screen
        name={ScreenId.BuyResellTickets}
        {...BuyResellTickets}
      />
    </Navigator>
  );
};

export default Stack;
