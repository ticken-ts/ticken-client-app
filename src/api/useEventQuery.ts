import {useQuery} from 'react-query';
import {getEvent} from '@app/api/api';

export const useEventQuery = (ID: string) => {
  return useQuery(['event', ID], () => getEvent(ID));
};
