import {NavigationContainer} from '@react-navigation/native';
import Stack from './src/navigation/mainStack/Stack';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {useLocalization} from './src/locale/useLocalization';
import SplashLoader from './src/components/SplashLoader';

export default function App() {
  return (
    <SplashLoader>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer>
            <MainApp/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SplashLoader>
  )
}

function MainApp() {
  useLocalization()
  return (
    <Stack/>
  );
}
