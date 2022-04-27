import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
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
import {getHiddenHeader} from '../navigation/headers';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useSignInMutation} from '../redux/authApi';
import {useForm} from '../hooks/useForm';

const LoginScreen = ({navigation}: ScreenProps<ScreenId.Login>) => {

  const [form, setForm] = useForm({
    email: '',
    password: '',
  })

  const [trigger, response] = useSignInMutation({fixedCacheKey: 'signIn'})

  const logIn = () => {
    trigger(form)
  };

  const goToRegister = () => {
    navigation.navigate(ScreenId.Register)
  }

  return (
    <KeyboardAvoid style={styles.container}>
      <FocusAwareStatusBar style={'dark'} />
      <Image
        source={require('../../assets/icon.png')}
        style={styles.logo}
        resizeMode={'contain'}
      />
      <Spacing v={squares(8)} />
      <Input
        onChangeText={email => setForm({email})}
        style={styles.input}
        textContentType={'emailAddress'}
        autoCapitalize={'none'}
        autoCorrect={false}
        autoCompleteType={'email'}
        keyboardType={'email-address'}
        placeholder={t('email')}
      />
      <Spacing v={squares(2)} />
      <Input
        onChangeText={password => setForm({password})}
        style={styles.input}
        placeholder={t('password')}
        textContentType={'password'}
        secureTextEntry
      />
      <Spacing v={squares(4)} />
      <Button style={styles.loginButton} title={t('login')} onPress={logIn} TextComponent={Typography}/>
      <Spacing v={squares(4)} />
      <View style={styles.signUpContainer}>
        <Typography style={styles.signUpText}>{t('signuptext')} </Typography>
        <TouchableOpacity onPress={goToRegister}>
          <Typography style={styles.signUpBtn}>{t('signupbtn')}</Typography>
        </TouchableOpacity>
      </View>
    </KeyboardAvoid>
  );
};

export default {
  component: LoginScreen,
  options: getHiddenHeader()
};

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
  },
  signUpContainer: {
    flexDirection: 'row'
  },
  signUpText: {
  },
  signUpBtn: {
    color: colors.primary
  },
  loginButton: {
    width: '60%'
  },

})
