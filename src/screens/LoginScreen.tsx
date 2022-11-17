import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScreenId} from '../navigation/mainStack/ScreenIDs';
import {ScreenProps} from '../navigation/mainStack/types';
import Typography from '../components/Typography';
import Image from '../components/Image';
import {t} from '../locale/useLocalization';
import Spacing from '../components/Spacing';
import Input from '../components/Input';
import KeyboardAvoid from '../components/KeyboardAvoid';
import Button from '../components/Button';
import {squares} from '../styles/grid';
import {colors} from '../styles/colors';
import {getTranslucentHeader} from '../navigation/mainStack/headers';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useForm} from '../hooks/useForm';
import useAppDispatch from '../hooks/useDispatch';
import {signIn} from '../redux/reducers/auth';
import {isFulfilled} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import BackButton from '../components/BackButton';

const LoginScreen = ({navigation}: ScreenProps<ScreenId.Login>) => {

  const dispatch = useAppDispatch()

  const [form, setForm] = useForm({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useForm({
    email: '',
    password: '',
  })

  const logIn = async () => {
    const res = await dispatch(signIn(form))
    if (!isFulfilled(res)) {
      if (res.error.code === AxiosError.ERR_BAD_REQUEST)
        setErrors({email: 'Invalid username or password'+ JSON.stringify(res.error)})
      else
        setErrors({email: 'There was an unknown error: ' + res.error.code})
    } else {
      navigation.pop(1)
    }
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
        autoComplete={'email'}
        keyboardType={'email-address'}
        placeholder={t('email')}
      />
      <Spacing v={squares(2)} />
      <Input
        error={errors.email}
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
  options: getTranslucentHeader({
    left: () => <BackButton />
  })
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
