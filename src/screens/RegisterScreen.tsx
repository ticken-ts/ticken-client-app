import React, {useReducer} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {getCustomHeader, getHiddenHeader, getTranslucentHeader} from '../navigation/headers';
import BackButton from '../components/BackButton';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {useForm} from '../hooks/useForm';
import Input from '../components/Input';
import Spacing from '../components/Spacing';
import {squares} from '../styles/grid';
import KeyboardAvoid from '../components/KeyboardAvoid';
import Button from '../components/Button';
import Typography from '../components/Typography';

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
          placeholder={'Email'}
          onChangeText={email => setForm({email})}
          value={form.email} />
        <Spacing v={squares(2)} />
        <Input
          textContentType={'password'}
          secureTextEntry
          placeholder={'Password'}
          onChangeText={password => setForm({password})}
          value={form.password} />
        <Spacing v={squares(2)} />
        <Input
          textContentType={'password'}
          secureTextEntry
          placeholder={'Repeat Password'}
          onChangeText={repeatedPassword => setForm({repeatedPassword})}
          value={form.repeatedPassword}
        />
        <Spacing v={squares(4)} />
        <Button title={'Sign Up'} onPress={signUp} TextComponent={Typography} />
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
