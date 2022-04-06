import {NavigationContainer} from '@react-navigation/native';
import Stack from './src/navigation/Stack';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {useLocalization} from './src/locale/useLocalization';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <MainApp/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

function MainApp() {
  useLocalization()
  return (
    <Stack/>
  );
}
