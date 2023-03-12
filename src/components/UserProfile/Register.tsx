import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Logo from '@app/assets/logo.svg';
import {squares} from '@app/styles/grid';
import Typography, {H2} from '@app/components/Typography';
import {Formik} from 'formik';
import Input from '@app/components/Input';
import Button from '@app/components/Button';
import {t} from '@app/locale/useLocalization';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCreateProfileMutation} from '@app/api/useCreateProfileMutation';
import KeyboardAvoid from '@app/components/KeyboardAvoid';
import Spacing from '@app/components/Spacing';
type PropsWithStyle = {
  style?: StyleProp<ViewStyle>;
  onLogout?: () => void;
}

const Register = ({onLogout, style}: PropsWithStyle) => {

  const insets = useSafeAreaInsets()

  const {createProfile} = useCreateProfileMutation();

  const registerUser = (data: {addressPK: string}) => {
    createProfile({
      addressPK: data.addressPK,
    })
  }

  return (
    <KeyboardAvoid behavior={"height"} style={style}>
      <FocusAwareStatusBar style={'dark'} />
      <Formik initialValues={{
        addressPK: '',
      }} onSubmit={registerUser}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
          <View style={styles.main}>
            <Logo width={squares(25)} height={squares(25)} />
            <View style={styles.texts}>
              <H2>We need more data to finish creating your profile!</H2>
              <Typography style={styles.firstText}>{t('enterEthAddress')}</Typography>
              <Typography style={styles.secondText}>{t('leaveBlank')}</Typography>
            </View>
            <Input
              placeholder={t('addressPK')}
              style={styles.input}
              onChangeText={handleChange('addressPK')}
              onBlur={handleBlur('addressPK')}
              value={values.addressPK}
            />
          </View>
          <Spacing v={squares(1)}/>
          <Button
            onPress={() => handleSubmit()}
            title={t('completeRegistration')}
            style={styles.signInButton}
          />
          <Spacing v={squares(1)}/>
          <Button
            onPress={onLogout}
            title={t('logOut')}
            style={styles.signInButton}
          />
          <View style={{height: insets.bottom || squares(2)}} />
          </>
        )}
      </Formik>
    </KeyboardAvoid>
  );
};

export default Register;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  main: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: squares(3),
  },
  texts: {
    alignSelf: 'stretch',
  },
  signInButton: {
    marginHorizontal: squares(2)
  },
  input: {
    alignSelf: 'stretch',
  },
  form: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    marginHorizontal: squares(3),
    flexGrow: 1,
  },
  firstText: {
    marginVertical: squares(1),
  },
  secondText: {
    marginBottom: squares(2),
  }
});
