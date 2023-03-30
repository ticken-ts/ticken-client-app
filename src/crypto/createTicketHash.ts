import { ApiEvent, ApiTicket } from "@app/api/models";
import { env } from "@app/config/loadEnvironment";
import totp from "totp-generator";
import * as crypto from "expo-crypto";
import { Buffer } from "buffer";
import { ec } from "elliptic";

const totpSecret = env.TOTP_SECRET

export const createTicketHash = async (ticket: ApiTicket, event: ApiEvent, privateKey: string) => {
    
    
    const fingerprint = await getTicketFingerprint(ticket, event)

    __DEV__ && console.log("Fingerprint: ", fingerprint)

    const uriEncodedFingerprint = encodeURIComponent(fingerprint)

    __DEV__ && console.log("Encoded fingerprint: ", uriEncodedFingerprint)

    __DEV__ && console.log("Private key: ", privateKey)

    const encrypted = await (async () => {
        const curve = new ec("secp256k1")
        const key = curve.keyFromPrivate(privateKey, "hex")
        const encrypted = key.sign(uriEncodedFingerprint, "hex")
        return encrypted
    })()

    const signature = JSON.stringify({
        r: encrypted.r.toString("hex"),
        s: encrypted.s.toString("hex"),
    })

    __DEV__ && console.log("Encrypted hash: ", signature)

    return signature
}

// Returns a SHA256 hash of the ticket fingerprint (event address + token ID + TOTP token)
const getTicketFingerprint = async (ticket: ApiTicket, event: ApiEvent) => {

    __DEV__ && console.log("Generating TOTP token using:", totpSecret)
    
    const totpToken = await (async () => totp(totpSecret, {
        digits: 8,
        algorithm: "SHA-512",

        // 10 minutes
        period: 10 * 60,
    }))()

    __DEV__ && console.log("TOTP token: ", totpToken)
    
    __DEV__ && console.log("Token ID: ", ticket.token_id)

    // Convert to hex using Buffer
    const tokenIDHex = Buffer.from(ticket.token_id).toString("hex")

    const fingerprint = `${event.pub_bc_address}/${tokenIDHex}/${totpToken}`

    const hashSha256 = await crypto.digestStringAsync(crypto.CryptoDigestAlgorithm.SHA256, fingerprint)

    return hashSha256
}