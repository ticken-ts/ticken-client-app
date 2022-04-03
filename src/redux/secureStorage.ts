import * as SecureStore from 'expo-secure-store';

interface Options {
  replaceCharacter?: string;
  replacer?: (key: string, replaceCharacter: string) => string;
}

export function secureStorage(options: Options) {
  const replaceCharacter = options.replaceCharacter || '_';
  const replacer = options.replacer || defaultReplacer;

  return {
    getItem: (key: string) =>
      SecureStore.getItemAsync(replacer(key, replaceCharacter)),
    setItem: (key: string, value: string) =>
      SecureStore.setItemAsync(replacer(key, replaceCharacter), value),
    removeItem: (key: string) =>
      SecureStore.deleteItemAsync(replacer(key, replaceCharacter)),
  };
}

function defaultReplacer(key: string, replaceCharacter: string) {
  return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
}
