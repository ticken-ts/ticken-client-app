import {useMutation, useQueryClient} from 'react-query';
import {useApi} from '@app/api/api';
import {useAuth} from '@app/hooks/useAuth';

export const useCreateProfileMutation = () => {
  const {createAccount} = useApi();
  const {token} = useAuth();
  const query = useQueryClient();

  const mutation = useMutation((data: any) => createAccount(data, token), {
    onSuccess: () => {
      query.invalidateQueries('user');
    }
  });

  const createProfile = (data: {addressPK: string}) => {
    mutation.mutate(data);
  }

  return {
    createProfile,
    ...mutation,
  }
}
