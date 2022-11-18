import React, {PropsWithChildren, useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {View} from 'react-native';
import loadFonts from '@app/fonts/loadFonts';

type Props = {}

const SplashLoader: React.FC<PropsWithChildren<Props>> = ({children}) => {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{flex: 1, width: '100%'}}>
      {children}
    </View>
  )
};

export default SplashLoader;
