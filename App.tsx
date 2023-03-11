import {NavigationContainer} from '@react-navigation/native';
import Stack from '@app/navigation/mainStack/Stack';
import {Provider} from 'react-redux';
import store, {persistor} from '@app/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {useLocalization} from '@app/locale/useLocalization';
import SplashLoader from '@app/components/SplashLoader';
import {AuthContextProvider} from '@app/context/AuthContext';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <SplashLoader>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <NavigationContainer>
                <MainApp/>
              </NavigationContainer>
            </AuthContextProvider>
          </QueryClientProvider>
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
