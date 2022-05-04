import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {getCustomHeader} from '../navigation/mainStack/headers';
import BackButton from '../components/BackButton';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useForm} from '../hooks/useForm';
import Input from '../components/Input';
import Spacing from '../components/Spacing';
import {squares} from '../styles/grid';
import KeyboardAvoid from '../components/KeyboardAvoid';
import Button from '../components/Button';
import Typography from '../components/Typography';
import {t} from '../locale/useLocalization';
import {colors} from '../styles/colors';
import useAppDispatch from '../hooks/useDispatch';
import {signIn, signUp} from '../redux/reducers/auth';
import {isFulfilled, isRejected} from '@reduxjs/toolkit';

const initialForm = {
  email: '',
  password: '',
  repeatedPassword: '',
  username: '',
}

const RegisterScreen = () => {

  const dispatch = useAppDispatch()

  const [form, setForm] = useForm(initialForm)
  const [errors, setErrors] = useForm(initialForm);

  const [loading, setLoading] = useState(false);

  const checkPasswordsMatch = () => {
    if (form.password !== form.repeatedPassword) {
      setErrors({repeatedPassword: t('passwordsDontMatch')})
      return false
    } else {
      setErrors({repeatedPassword: ''})
      return true
    }
  };

  const signUpPress = async () => {
    setLoading(true)
    console.log('signing up')
    if (checkPasswordsMatch()) {
      console.log('sending sign up request', form)
      const registerRes = await dispatch(signUp(form))
      console.log(registerRes.payload)
      if (isFulfilled(registerRes)) {
        console.log('signed up successfully')
        await dispatch(signIn({
          email: form.username,
          password: form.password
        }))
      } else if (isRejected(registerRes)) {
        console.log('registration failed', registerRes.error)
      }
    }
    setLoading(false)
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style={'dark'} />
      <KeyboardAvoid style={styles.formContainer}>
        {loading && <ActivityIndicator size={'small'} color={colors.primary} /> }
        <Spacing v={squares(2)} />
        <Input
          textContentType={'nickname'}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoCompleteType={'username'}
          keyboardType={'default'}
          placeholder={t('username')}
          onChangeText={username => setForm({username})}
          value={form.username}
          error={errors.username}
        />
        <Spacing v={squares(2)} />
        <Input
          textContentType={'emailAddress'}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoCompleteType={'email'}
          keyboardType={'email-address'}
          placeholder={t('email')}
          onChangeText={email => setForm({email})}
          value={form.email}
          error={errors.email}
        />
        <Spacing v={squares(2)} />
        <Input
          textContentType={'newPassword'}
          secureTextEntry
          placeholder={t('password')}
          onChangeText={password => setForm({password})}
          value={form.password}
          error={errors.password}
        />
        <Spacing v={squares(2)} />
        <Input
          textContentType={'newPassword'}
          secureTextEntry
          placeholder={t('repeatPassword')}
          onChangeText={repeatedPassword => setForm({repeatedPassword})}
          value={form.repeatedPassword}
          error={errors.repeatedPassword}
        />
        <Spacing v={squares(4)} />
        <Button title={t('signupbtn')} onPress={signUpPress} TextComponent={Typography} />
      </KeyboardAvoid>
    </View>
  );
};

export default {
  component: RegisterScreen,
  options: getCustomHeader({
    left: () => <BackButton />,
    backgroundColor: colors.transparent
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formContainer: {
    flex: 1,
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
});
