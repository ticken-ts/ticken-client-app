import { useAuth } from '@app/hooks/useAuth';
import { useMutation, useQueryClient } from 'react-query';
import { createAccount, purchaseResellTicket, purchaseTicket as purchaseTicketCall } from '@app/api/api';
import { EventModel } from '@app/model/Event';
import { ApiError } from './models';

export type PurchaseResellTicketData = {
  event: EventModel,
  section: string,
  ticketID: string,
  resellID: string,
}

export const usePurchaseResellTicketMutation = () => {
  const { token } = useAuth();
  const query = useQueryClient();

  const mutation = useMutation((data: PurchaseResellTicketData) => purchaseResellTicket(data.event.id, data.ticketID, data.resellID, token), {
    onSuccess: () => {
      query.invalidateQueries('myTickets');
    },
  });

  const purchaseTicket = mutation.mutateAsync;

  return {
    purchaseTicket,
    ...mutation,
  }
}
