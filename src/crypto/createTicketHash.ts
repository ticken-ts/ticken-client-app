import { ApiEvent, ApiTicket } from "@app/api/models";
import { env } from "@app/config/loadEnvironment";
import totp from "totp-generator";
import * as crypto from "expo-crypto";
import { Buffer } from "buffer";
import { ec } from "elliptic";
import { DateTime } from "luxon";

const totpSecret = env.TOTP_SECRET

export const createTicketHash = async (ticket: ApiTicket, event: ApiEvent, privateKey: string) => {
    
    const {fingerprintHash, expirationDateSeconds} = await getTicketFingerprint(ticket, event)

    __DEV__ && console.log("Fingerprint: ", fingerprintHash)

    const uriEncodedFingerprint = encodeURIComponent(fingerprintHash)

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

    return {signature, expirationDateSeconds}
}

// Returns a SHA256 hash of the ticket fingerprint (event address + token ID + TOTP token)
const getTicketFingerprint = async (ticket: ApiTicket, event: ApiEvent) => {

    __DEV__ && console.log("Generating TOTP token using:", totpSecret)
    
    const periodSeconds = 60
    const expirationDateSeconds = Math.floor(DateTime.now().toUnixInteger() / periodSeconds) * 60 + periodSeconds

    __DEV__ && console.log("Expiration date: ", expirationDateSeconds)

    const totpToken = await (async () => totp(totpSecret, {
        digits: 8,
        algorithm: "SHA-512",
        period: periodSeconds,
        timestamp: Date.now(),
    }))()

    __DEV__ && console.log("TOTP token: ", totpToken)
    
    __DEV__ && console.log("Token ID: ", ticket.token_id)

    // Convert to hex using Buffer
    const tokenIDHex = Buffer.from(ticket.token_id).toString("hex")

    const fingerprint = `${event.pub_bc_address}/${tokenIDHex}/${totpToken}`

    const fingerprintHash = await crypto.digestStringAsync(crypto.CryptoDigestAlgorithm.SHA256, fingerprint)

    return {fingerprintHash, expirationDateSeconds}
}