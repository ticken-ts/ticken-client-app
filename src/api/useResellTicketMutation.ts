import { useMutation, useQueryClient } from "react-query"
import { ResellCurrency } from "./models"
import { resellTicket as resellTicketCall } from "./api"
import { useAuth } from "@app/hooks/useAuth"
import { AxiosError } from "axios"

type ResellTicketData = {
    ticketID: string
    eventID: string
    price: number
    currency: ResellCurrency
}

export const useResellTicketMutation = () => {
    const { token } = useAuth()

    const query = useQueryClient()

    const mutation = useMutation((data: ResellTicketData) => resellTicketCall(data.eventID, data.ticketID, data.price, token), {
        onSuccess: () => {
            query.invalidateQueries("myTickets")
        },
    })

    const resellTicket = mutation.mutateAsync

    return {
        resellTicket,
        ...mutation,
        error: mutation.error as AxiosError
    }
}