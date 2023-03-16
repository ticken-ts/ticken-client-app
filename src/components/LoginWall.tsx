import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useAuth} from '@app/hooks/useAuth';
import {useProfileQuery} from '@app/api/useProfileQuery';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Logo from '@app/assets/logo.svg';
import {squares} from '@app/styles/grid';
import {H1} from '@app/components/Typography';
import Register from '@app/components/UserProfile/Register';
import NotSigned from '@app/components/UserProfile/NotSigned';
import {User} from '@app/model/User';

type Props = {
  children: (user: User) => React.ReactNode,
  style?: StyleProp<ViewStyle>
}

const LoginWall: React.FC<Props> = ({children, style}) => {
  const {logout, login, isLoggedIn} = useAuth();

  const {data, isLoading} = useProfileQuery();

  const insets = useSafeAreaInsets()

  if (isLoggedIn) {
    if (data) {
      return (
        <View style={style}>
          {children(data)}
        </View>
      );
    } else if (isLoading) {
      return (
        <View style={styles.container}>
          <FocusAwareStatusBar style={'dark'} />
          <View style={styles.main}>
            <Logo width={squares(25)} height={squares(25)} />
            <H1>Loading...</H1>
          </View>
          <View style={{height: insets.bottom || squares(2)}} />
        </View>
      )
    } else {
      return (
        <Register style={styles.container} onLogout={logout} />
      )
    }
  } else {
    return (
      <NotSigned style={styles.container} onPressLogin={login} />
    );
  }
};

export default LoginWall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInButton: {
    margin: squares(2)
  },
  input: {
    alignSelf: 'stretch',
  }
});
