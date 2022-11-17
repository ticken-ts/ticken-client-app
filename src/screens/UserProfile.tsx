import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getTranslucentHeader} from '../navigation/mainStack/headers';
import BackButton from '../components/BackButton';
import {colors} from '../styles/colors';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import Button from '../components/Button';
import {t} from '../locale/useLocalization';
import useAppDispatch from '../hooks/useDispatch';
import {invalidateToken, signOutApp} from '../redux/reducers/auth';
import {useSelector} from 'react-redux';
import {isLoggedIn, selectToken} from '../redux/selectors/auth';
import Typography from '../components/Typography';
import {ScreenProps} from '../navigation/mainStack/types';
import {ScreenId} from '../navigation/mainStack/ScreenIDs';

const UserProfile = ({navigation}: ScreenProps<ScreenId.UserProfile>) => {

  const dispatch = useAppDispatch()
  const loggedIn = useSelector(isLoggedIn)
  const token = useSelector(selectToken)

  const logout = () => {
    dispatch(signOutApp())
  };

  const login = () => {
    navigation.navigate(ScreenId.Login)
  }

  if (loggedIn) {
    return (
      <View style={styles.container}>
        <Typography>You are logged in</Typography>
        <Typography>{token?.slice(0, 10)}...</Typography>
        <Button
          onPress={logout}
          title={t('logOut')}
        />
        <Button
          onPress={() => dispatch(invalidateToken())}
          title={'Invalidate token'}
        />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <FocusAwareStatusBar style={'dark'} />
        <Typography>You are not logged in</Typography>
        <Button
          onPress={login}
          title={t('login')}
        />
      </View>
    );
  }

};

export default {
  component: UserProfile,
  options: getTranslucentHeader({
    left: () => <BackButton />,
    backgroundColor: colors.primary,
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
