import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenId} from '../navigation/ScreenIDs';
import {ScreenProps} from '../navigation/types';
import Typography from '../components/Typography';
import Image from '../components/Image'
import {t} from '../locale/useLocalization';
import Spacing from '../components/Spacing';

const LoginScreen = ({navigation}: ScreenProps<ScreenId.Login>) => {

  useEffect(() => navigation.setOptions({
    headerShown: false,
  }), [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.logo}
        resizeMode={'contain'}
      />
      <Spacing v={10} />
      <Typography style={styles.text}>{t('welcome')}</Typography>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    // borderWidth: 10,
    // borderColor: 'black'
  },
  text: {
    fontSize: 20,
    fontWeight: 'normal'
  },
  logo: {
    width: '50%',
    aspectRatio: 1,
    // backgroundColor: '#48ff82',
  }
})
