import {NavigationContainer} from '@react-navigation/native';
import Stack from './src/navigation/Stack';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

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
  return (
    <Stack/>
  );
}
