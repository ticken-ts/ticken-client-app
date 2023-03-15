import {useMutation, useQueryClient} from 'react-query';
import {useAuth} from '@app/hooks/useAuth';
import {createAccount} from '@app/api/api';

export const useCreateProfileMutation = () => {
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
