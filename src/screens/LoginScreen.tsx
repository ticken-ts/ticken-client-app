import React, {useEffect} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {ScreenId} from '../navigation/ScreenIDs';
import {ScreenProps} from '../navigation/types';
import Typography from '../components/Typography';
import Image from '../components/Image'
import {t} from '../locale/useLocalization';
import Spacing from '../components/Spacing';
import Input from '../components/Input';

const LoginScreen = ({navigation}: ScreenProps<ScreenId.Login>) => {

  useEffect(() => navigation.setOptions({
    headerShown: false,
  }), [])

  return (
    <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.logo}
        resizeMode={'contain'}
      />
      <Spacing v={50} />
      {/*<Typography style={styles.text}>{t('welcome')}</Typography>*/}
      <Input style={styles.input} placeholder={t('email')} autoCorrect={false} keyboardType={'email-address'} />
      <Spacing v={25} />
      <Input style={styles.input} placeholder={t('password')} secureTextEntry />
    </KeyboardAvoidingView>
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
  },
  input: {
    width: '50%',
    padding: 10
  },
})
