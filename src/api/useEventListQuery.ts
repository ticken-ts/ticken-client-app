import {useQuery} from 'react-query';
import {fetchEvents} from '@app/api/api';

export const useEventListQuery = () => {
  return useQuery('events', fetchEvents);
};
