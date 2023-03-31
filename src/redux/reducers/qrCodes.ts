import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QRCode {
    id: string;
    data: string;
    expiresAtMillis: number;
}

interface QRState {
    qrCodes: {
        [id: string]: QRCode | undefined;
    };
}

const qrSlice = createSlice({
    name: 'qrCodes',
    initialState: {
        qrCodes: {},
    } as QRState,
    reducers: {
        addQRCode: (state, action: PayloadAction<QRCode>) => {
            state.qrCodes[action.payload.id] = action.payload;
        }
    }
});

export const { addQRCode } = qrSlice.actions;
export default qrSlice.reducer;