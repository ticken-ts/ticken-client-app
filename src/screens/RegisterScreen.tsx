import React from 'react';
import {StyleSheet, View} from 'react-native';
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

const initialForm = {
  email: '',
  password: '',
  repeatedPassword: '',
}

const RegisterScreen = () => {

  const [form, setForm] = useForm(initialForm)

  const signUp = () => {

  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style={'dark'} />
      <KeyboardAvoid style={styles.formContainer}>
        <Input
          textContentType={'emailAddress'}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoCompleteType={'email'}
          keyboardType={'email-address'}
          placeholder={t('email')}
          onChangeText={email => setForm({email})}
          value={form.email}
        />
        <Spacing v={squares(2)} />
        <Input
          textContentType={'password'}
          secureTextEntry
          placeholder={t('password')}
          onChangeText={password => setForm({password})}
          value={form.password}
        />
        <Spacing v={squares(2)} />
        <Input
          textContentType={'password'}
          secureTextEntry
          placeholder={t('repeatPassword')}
          onChangeText={repeatedPassword => setForm({repeatedPassword})}
          value={form.repeatedPassword}
        />
        <Spacing v={squares(4)} />
        <Button title={t('signupbtn')} onPress={signUp} TextComponent={Typography} />
      </KeyboardAvoid>
    </View>
  );
};

export default {
  component: RegisterScreen,
  options: getCustomHeader({
    left: () => <BackButton />
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
