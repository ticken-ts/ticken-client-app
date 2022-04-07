import * as Font from 'expo-font';

async function loadfonts () {
  await Font.loadAsync({
    'italic': require('../../assets/fonts/italic.ttf'),
    'main': require('../../assets/fonts/main.ttf'),
    'italic-bold': require('../../assets/fonts/italic-bold.ttf'),
    'main-bold': require('../../assets/fonts/main-bold.ttf'),
    'italic-black': require('../../assets/fonts/italic-black.ttf'),
    'main-black': require('../../assets/fonts/main-black.ttf'),
    'italic-extrabold': require('../../assets/fonts/italic-extrabold.ttf'),
    'main-extrabold': require('../../assets/fonts/main-extrabold.ttf'),
    'italic-extralight': require('../../assets/fonts/italic-extralight.ttf'),
    'main-extralight': require('../../assets/fonts/main-extralight.ttf'),
    'italic-light': require('../../assets/fonts/italic-light.ttf'),
    'main-light': require('../../assets/fonts/main-light.ttf'),
    'italic-medium': require('../../assets/fonts/italic-medium.ttf'),
    'main-medium': require('../../assets/fonts/main-medium.ttf'),
    'italic-semibold': require('../../assets/fonts/italic-semibold.ttf'),
    'main-semibold': require('../../assets/fonts/main-semibold.ttf'),
    'italic-thin': require('../../assets/fonts/italic-thin.ttf'),
    'main-thin': require('../../assets/fonts/main-thin.ttf'),
  });
}

export default loadfonts;
