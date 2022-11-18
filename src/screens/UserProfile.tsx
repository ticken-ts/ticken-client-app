import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getTranslucentHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {colors} from '@app/styles/colors';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Button from '@app/components/Button';
import {t} from '@app/locale/useLocalization';
import useAppDispatch from '@app/hooks/useDispatch';
import {invalidateToken, signOutApp} from '@app/redux/reducers/auth';
import {useSelector} from 'react-redux';
import {isLoggedIn, selectToken} from '@app/redux/selectors/auth';
import Typography from '@app/components/Typography';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';

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
