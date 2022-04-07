import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScreenId} from '../navigation/ScreenIDs';
import {ScreenProps} from '../navigation/types';
import Typography from '../components/Typography';

const LoginScreen = ({navigation}: ScreenProps<ScreenId.Login>) => {

  useEffect(() => navigation.setOptions({
    headerShown: false,
  }), [])

  return (
    <View style={styles.container}>
      <Typography>Welcome to the Ticken App!</Typography>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
