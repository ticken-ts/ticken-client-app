import { ApiEvent, ApiTicket } from "@app/api/models";
import { env } from "@app/config/loadEnvironment";
import totp from "totp-generator";
import crypto, { CryptoDigestAlgorithm } from "expo-crypto";

const totpSecret = env.TOTP_SECRET

export const createTicketHash = async (ticket: ApiTicket, event: ApiEvent, privateKey: string) => {
    
    
    const fingerprint = await getTicketFingerprint(ticket, event)

    const hash = encodeURIComponent(fingerprint)

    // TODO: encrypt using RSA PSS with SHA-256 and MGF1 (SHA-256)
    
    return hash
}

const getTicketFingerprint = async (ticket: ApiTicket, event: ApiEvent) => {
    const totpToken = totp(totpSecret, {
        digits: 8,
        algorithm: "SHA-512",
        period: 10,
    })
    
    // Convert to hex using Buffer
    const tokenIDHex = Buffer.from(ticket.token_id).toString("hex")

    const fingerprint = `${event.pub_bc_address}/${tokenIDHex}/${totpToken}`

    const hashSha256 = await crypto.digestStringAsync(CryptoDigestAlgorithm.SHA256, fingerprint)

    return hashSha256
}