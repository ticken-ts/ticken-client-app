import {NavigationContainer} from '@react-navigation/native';
import Stack from './src/navigation/Stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainApp/>
      </NavigationContainer>
    </Provider>
  )
}

function MainApp() {
  return (
    <Stack/>
  );
}
