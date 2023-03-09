import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {H1} from '@app/components/Typography';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {getTranslucentHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';

const BuyTickets = ({route, navigation}: ScreenProps<ScreenId.BuyTickets> ) => {

    const buyTicket = () => {

    };

  return (
    <View style={styles.container}>
      <Formik initialValues={{
        section: '',
      }} onSubmit={buyTicket}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.main}>
            <H1>Buy Tickets</H1>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default {
    component: BuyTickets,
    options: getTranslucentHeader({
        left: () => <BackButton />
    }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
