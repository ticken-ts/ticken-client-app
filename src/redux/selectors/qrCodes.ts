import { RootState } from "../store";

export const selectQRCode = (id: string) => (state: RootState) => state.securePersisted.qrCodes.qrCodes[id];