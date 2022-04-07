import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {ScreenId} from '../navigation/ScreenIDs';
import {ScreenProps} from '../navigation/types';
import Typography from '../components/Typography';
import Image from '../components/Image'
import {t} from '../locale/useLocalization';
import Spacing from '../components/Spacing';
import Input from '../components/Input';
import KeyboardAvoid from '../components/KeyboardAvoid';
import Button from '../components/Button';
import {squares} from '../styles/grid';
import {colors} from '../styles/colors';

const LoginScreen = ({navigation}: ScreenProps<ScreenId.Login>) => {

  useEffect(() => navigation.setOptions({
    headerShown: false,
  }), [])

  const logIn = () => {
    navigation.navigate(ScreenId.Home)
  };

  return (
    <KeyboardAvoid style={styles.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.logo}
        resizeMode={'contain'}
      />
      <Spacing v={squares(8)} />
      <Input style={styles.input} autoCapitalize={'none'} placeholder={t('email')} autoCorrect={false} keyboardType={'email-address'} />
      <Spacing v={squares(2)} />
      <Input style={styles.input} placeholder={t('password')} secureTextEntry />
      <Spacing v={squares(4)} />
      <Button title={t('login')} onPress={logIn}/>
      <Spacing v={squares(4)} />
      <View style={styles.signUpContainer}>
        <Typography style={styles.signUpText}>{t('signuptext')} </Typography>
        <Typography style={styles.signUpBtn}>{t('signupbtn')}</Typography>
      </View>
    </KeyboardAvoid>
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
  logo: {
    width: '50%',
    aspectRatio: 1,
    // backgroundColor: '#48ff82',
  },
  input: {
    width: '60%',
    paddingVertical: squares(1),
    paddingHorizontal: squares(2)
  },
  signUpContainer: {
    flexDirection: 'row'
  },
  signUpText: {
  },
  signUpBtn: {
    color: colors.primary
  }
})
