import {useQuery} from 'react-query';
import {fetchMyUser, getMyPrivateKey} from '@app/api/api';
import {useAuth} from '@app/hooks/useAuth';

export const usePrivateKeyQuery  = () => {
  const {token} = useAuth();

  return useQuery(['myPrivateKey', token], () => getMyPrivateKey(token), {
    keepPreviousData: true,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
};
