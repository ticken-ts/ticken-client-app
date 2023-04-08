import { useToggle } from '@app/hooks/useToggle';
import React, { PropsWithChildren } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  showing: boolean;
  onAttemptClose: () => void;
};

export const Popup: React.FC<PropsWithChildren<Props>> = ({showing, onAttemptClose, children}) => {

  return (
    <Modal onRequestClose={onAttemptClose} transparent visible={showing} style={StyleSheet.absoluteFillObject}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onAttemptClose} activeOpacity={1} style={styles.background} />
        {children}
      </View>
    </Modal>
  );

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});