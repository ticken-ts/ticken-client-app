import {useApi} from '@app/api/api';
import {useQuery} from 'react-query';
import {useAuth} from '@app/hooks/useAuth';

export const useProfileQuery = () => {
  const {fetchMyUser} = useApi();
  const {token} = useAuth();

  return useQuery(['user', token], () => fetchMyUser(token));
};
