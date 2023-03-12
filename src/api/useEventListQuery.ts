import {useQuery} from 'react-query';
import {useApi} from '@app/api/api';

export const useEventListQuery = () => {
  const {fetchEvents} = useApi();

  return useQuery('events', fetchEvents);
};
