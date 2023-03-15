# Guia para desarrollo

## Autenticacion

Los parametros de autenticacion se configuran en las variables de entorno en el archivo `.env` en la raiz del proyecto.

Para realizar el flujo de autenticacion se debe encerrar a la app con el componente `AuthContextProvider` en `src/App.tsx`:

```tsx
// App.tsx
import React from 'react';
import {AuthContextProvider} from '@app/context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
        <MainStack />
    </AuthContextProvider>
  );
};
```

Luego podemos utilizar el hook `useAuth` para obtener el token de autenticacion, el estado de autenticacion y las funciones de login y logout:

```tsx
// ...
import {useAuth} from '@app/context/AuthContext';
// ...

const MyScreen = () => {
  const {token, isLoggedIn, login, logout} = useAuth();
  
  // ...
}
```

La funcion `login` inicia el flujo de autenticacion lanzando el navegador para que el usuario ingrese sus credenciales. Luego se obtiene el token de autenticacion y se guarda en el storage del dispositivo.

La funcion `logout` elimina el token de autenticacion del storage del dispositivo y desloguea al usuario del proveedor de autenticacion.

## Pantallas nuevas

Para agregar una pantalla nueva se debe agregar en el archivo `src/navigation/mainStack/ScreenIDs.ts` el ID de la pantalla y su tipo de parámetros:
    
```ts
export enum ScreenId {
  Home = "Home",
  EventDetails = "EventDetails",
  UserProfile = "UserProfile",
  BuyTickets = "BuyTickets",
  
  // La nueva pantalla a agregar
  MyScreen = "MyScreen",
}

export type RootStackParamList = {
  [ScreenId.Home]: undefined;
  [ScreenId.EventDetails]: {
    event: EventModel,
  };
  [ScreenId.UserProfile]: {
    userId?: string,
  };
  [ScreenId.BuyTickets]: {
    event: EventModel,
  };
  
  // El tipo de parámetros de la nueva pantalla
  [ScreenId.MyScreen]: {
    myParam: string,
  }
}
```

Esto hace mas facil la navegacion entre pantallas, ya con typescript tenemos autocompletado y verificacion de tipos al usar el navigation prop:


```ts
const OtherScreen = ({navigation}: ScreenProps<ScreenId.OtherScreen>) => {
  // ...
  
  // Navegamos a otra pantalla
  navigation.navigate(ScreenId.MyScreen, {
    myParam: 'myParam',
  });
}
```

Luego se debe crear el archivo correspondiente en la carpeta `src/screens` con el siguiente contenido básico:

```tsx
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getTranslucentHeader} from '@app/navigation/mainStack/headers';
import BackButton from '@app/components/BackButton';
import {colors} from '@app/styles/colors';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import {H1} from '@app/components/Typography';
import {ScreenProps} from '@app/navigation/mainStack/types';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';

const MyScreen = ({navigation}: ScreenProps<ScreenId.MyScreen>) => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        style={'dark'}
        backgroundColor="transparent"
      />
      <H1>ScreenName</H1>
    </View>
  );
};

export default {
  component: MyScreen,
  options: getTranslucentHeader({
    left: () => <BackButton />,
    // right: <>...</>,
    // mid: <>...</>,
    backgroundColor: colors.primary,
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
```

Algo a notar es que no exportamos el componente directamente, sino que lo envolvemos en un objeto con las propiedades `component` y `options`. Esto es necesario para que el componente pueda ser utilizado por el stack de navegación.
Esto esta hecho así para que toda la pantalla, tanto el contenido como el header, esté en un solo archivo.

Luego agregamos la pantalla al stack en el archivo `src/navigation/mainStack/Stack.tsx`:

```tsx
// ...
import MyScreen from '@app/screens/MyScreen';
import {ScreenId} from '@app/navigation/mainStack/ScreenIDs';
// ...


const Stack = () => {

  return (
    <Navigator screenOptions={{headerShown: false}}>
      // ...
      <Screen
        name={ScreenId.MyScreen}
        {...MyScreen}
      />
      // ...
    </Navigator>
  );
};
```

## Llamadas a la API

Para esto usamos la librería react-query.
Primero creamos la funcion que llama a la API en `src/api/api.ts`

```ts

// ...
export const fetchMyUser = async (token: string | null) => {
  if (!token) {
    return undefined;
  }
  try {
    console.log("Getting user with token: ", token);
    const user = await ticketsApi.get<ApiResponse<ApiUser>>('/users/myUser', {
      headers: {
        Authorization: token
      }
    });
    return toUser(user.data.data);
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return undefined;
      }
    }
    throw e;
  }
}
// ...

```

Luego creamos el archivo para el hook que haga la query en `src/api`
(ver la documentacion de react-query para mas info)

```ts
export const useProfileQuery = () => {
  const {token} = useAuth();

  return useQuery(['user', token], () => fetchMyUser(token));
};
```
