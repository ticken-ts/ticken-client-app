import React, {useContext} from 'react';
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
import {useMutation, useQueryClient} from 'react-query';
import {createAccount} from '@app/api/api';
import {AuthContext} from '@app/context/AuthContext';
type PropsWithStyle = {
  style?: StyleProp<ViewStyle>;
  onLogout?: () => void;
}

const Register = ({onLogout, style}: PropsWithStyle) => {

  const insets = useSafeAreaInsets()

  const {token} = useContext(AuthContext)

  const queryClient = useQueryClient()

  const {mutate} = useMutation(['user'], createAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']).catch(() => {
        console.log('error invalidating user')
      })
    }
  })

  const registerUser = (data: {addressPK: string}) => {
    if (token) {
      mutate({
        token,
        addressPK: data.addressPK
      }, {
        onSuccess: () => {
          queryClient.invalidateQueries(['user'])
        }
      })
    }
  }

  return (
    <View style={style}>
      <FocusAwareStatusBar style={'dark'} />
      <Formik initialValues={{
        addressPK: '',
      }} onSubmit={registerUser}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
          <View style={styles.main}>
            <Logo width={squares(25)} height={squares(25)} />
            <H2>We need more data to finish creating your profile!</H2>
            <Typography style={styles.firstText}>{t('enterEthAddress')}</Typography>
            <Typography style={styles.secondText}>{t('leaveBlank')}</Typography>
            <Input
              placeholder={t('addressPK')}
              style={styles.input}
              onChangeText={handleChange('addressPK')}
              onBlur={handleBlur('addressPK')}
              value={values.addressPK}
            />
          </View>
          <Button
            onPress={() => handleSubmit()}
            title={t('completeRegistration')}
            style={styles.signInButton}
          />
          <Button
            onPress={onLogout}
            title={t('logOut')}
            style={styles.signInButton}
          />
          <View style={{height: insets.bottom || squares(2)}} />
          </>
        )}
      </Formik>
    </View>
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
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginHorizontal: squares(3),
  },
  signInButton: {
    margin: squares(2)
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
