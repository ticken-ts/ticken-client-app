import BackButton from '@app/components/BackButton';
import { getTranslucentHeader } from '@app/navigation/mainStack/headers';
import { createScreen } from '@app/navigation/mainStack/types';
import React from 'react';
import { View, Text } from 'react-native';

function TicketResellConfirmation() {
  return (
    <View>
      <Text></Text>
     </View>
  );
}

export default createScreen({
    component: TicketResellConfirmation,
    options: getTranslucentHeader({
        left: () => <BackButton />,
    })
})
