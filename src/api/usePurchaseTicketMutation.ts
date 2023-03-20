import {useAuth} from '@app/hooks/useAuth';
import {useMutation, useQueryClient} from 'react-query';
import {createAccount, purchaseTicket as purchaseTicketCall} from '@app/api/api';
import {EventModel} from '@app/model/Event';

export type PurchaseTicketData = {
  event: EventModel,
  section: string
}

export const usePurchaseTicketMutation = () => {
  const {token} = useAuth();
  const query = useQueryClient();

  const mutation = useMutation((data: PurchaseTicketData) => purchaseTicketCall(data.event, data.section, token), {
    onSuccess: () => {
      query.invalidateQueries('myTickets');
    }
  });

  const purchaseTicket = mutation.mutateAsync;

  return {
    purchaseTicket,
    ...mutation,
  }
}
