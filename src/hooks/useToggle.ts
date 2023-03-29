import {useState} from 'react';

export const useToggle = (): [boolean, () => void] => {
  const [value, setValue] = useState(false);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}
