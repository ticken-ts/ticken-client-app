import {NavigationContainer} from '@react-navigation/native';
import Stack from './src/navigation/Stack';

export default function App() {
  return (
    <NavigationContainer>
      <MainApp/>
    </NavigationContainer>
  )
}

function MainApp() {
  return (
    <Stack/>
  );
}
