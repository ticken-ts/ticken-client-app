import {StackNavigationOptions} from '@react-navigation/stack';
import {colors} from '../../styles/colors';

export function getHiddenHeader(): StackNavigationOptions {

   return ({
     headerShown: false,
   })

}

type HeaderOptions = {
  left?: StackNavigationOptions['headerLeft'],
  mid?: StackNavigationOptions['headerTitle'],
  right?: StackNavigationOptions['headerRight'],
  backgroundColor?: string
}

export function getCustomHeader(options: HeaderOptions): StackNavigationOptions {

  return ({
    headerShown: true,
    headerLeft: options.left || (() => null),
    headerTitle: options.mid ? options.mid : () => null,
    headerTitleAlign: 'center',
    headerRight: options.right,
    headerBackTitleVisible: false,
    // headerTintColor: options.backgroundColor,
    headerStyle: {
      backgroundColor: options.backgroundColor
    }
  })
}

export function getTranslucentHeader(options: HeaderOptions): StackNavigationOptions {

  return ({
    headerShown: true,

    headerLeft: options.left || (() => null),
    headerTitle: options.mid ? options.mid : () => null,
    headerTitleAlign: 'center',
    headerRight: options.right,
    headerBackTitleVisible: false,
    // headerTintColor: options.backgroundColor,
    // headerMode: 'float',
    headerTransparent: true,
    headerStyle: {
      backgroundColor: options.backgroundColor || colors.transparent
    }
  })
}
