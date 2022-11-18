import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {en} from '@app/locale/en';
import {es} from '@app/locale/es';
import {AppState} from 'react-native';
import {useEffect} from 'react';

type TranslationFunction = (t: keyof typeof en) => string;

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en,
  es
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export function useLocalization () {
  const subscribeToLocalizationChanges = () => {
    AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        i18n.locale = (await Localization.getLocalizationAsync()).locale
      }
    })
  }

  useEffect(subscribeToLocalizationChanges, []);
}

export const t: TranslationFunction = (text) => {
  return i18n.t(text)
}
