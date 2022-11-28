import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {getTranslucentHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {colors} from '@app/styles/colors';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Button from '@app/components/Button';
import {t} from '@app/locale/useLocalization';
import useAppDispatch from '@app/hooks/useDispatch';
import Typography from '@app/components/Typography';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
import {AuthContext} from '@app/context/AuthContext';

const UserProfile = ({navigation}: ScreenProps<ScreenId.UserProfile>) => {

  const dispatch = useAppDispatch()

  const {logout, login, ready, token, isLoggedIn} = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Typography>You are logged in</Typography>
        <Typography>{token?.slice(0, 10)}...</Typography>
        <Button
          onPress={logout}
          title={t('logOut')}
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
