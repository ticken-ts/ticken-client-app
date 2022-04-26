import {useReducer} from 'react';

export const useForm = <T extends object>(initialForm: T) => {
  return useReducer((state: T, action: Partial<T>) => {
    return {...state, ...action}
  }, initialForm);

}
