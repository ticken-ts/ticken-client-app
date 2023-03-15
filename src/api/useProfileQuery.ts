import {useQuery} from 'react-query';
import {useAuth} from '@app/hooks/useAuth';
import {fetchMyUser} from '@app/api/api';

export const useProfileQuery = () => {
  const {token} = useAuth();

  return useQuery(['user', token], () => fetchMyUser(token));
};
