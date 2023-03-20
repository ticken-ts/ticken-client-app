import {useQuery} from 'react-query';
import {fetchMyUser, getMyTickets} from '@app/api/api';
import {useAuth} from '@app/hooks/useAuth';

export const useGetMyTicketsQuery  = () => {
  const {token} = useAuth();

  return useQuery(['myTickets', token], () => getMyTickets(token));
};
