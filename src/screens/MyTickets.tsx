import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getTranslucentHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {colors} from '@app/styles/colors';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import {H1} from '@app/components/Typography';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';

const MyTickets = ({navigation}: ScreenProps<ScreenId.MyTickets>) => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        style={'dark'}
        backgroundColor="transparent"
      />
      <H1>ScreenName</H1>
    </View>
  );
};

export default {
  component: MyTickets,
  options: getTranslucentHeader({
    left: () => <BackButton />,
    // right: <>...</>,
    // mid: <>...</>,
    backgroundColor: colors.primary,
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
