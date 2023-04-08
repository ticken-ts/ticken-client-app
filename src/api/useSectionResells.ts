import { useAuth } from "@app/hooks/useAuth"
import { useQuery } from "react-query";
import { getSectionResells } from "./api";

export const useSectionResells = (eventId: string, section: string) => {
    const {token} = useAuth();

    return useQuery(['sectionResells', eventId, section, token], async () => getSectionResells(eventId, section, token));
}