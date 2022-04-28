import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getTranslucentHeader} from '../navigation/mainStack/headers';
import BackButton from '../components/BackButton';
import {colors} from '../styles/colors';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import Button from '../components/Button';
import {t} from '../locale/useLocalization';
import useAppDispatch from '../hooks/useDispatch';
import {signOutApp} from '../redux/reducers/auth';
import {useSelector} from 'react-redux';
import {isLoggedIn, selectToken} from '../redux/selectors/auth';
import Typography from '../components/Typography';

const UserProfile = () => {

  const dispatch = useAppDispatch()
  const loggedIn = useSelector(isLoggedIn)
  const token = useSelector(selectToken)

  const logout = () => {
    dispatch(signOutApp())
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style={'dark'} />
      <Typography>{loggedIn ? 'You are logged in' : 'You are not logged in'}</Typography>
      <Typography>{token}</Typography>
      <Button
        onPress={logout}
        title={t('logOut')}
      />
    </View>
  );
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
