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

    const hash = encodeURIComponent(fingerprint)

    __DEV__ && console.log("Hash: ", hash)

    __DEV__ && console.log("Private key: ", privateKey)

    const curve = new ec("secp256k1")
    const key = curve.keyFromPrivate(Buffer.from(privateKey, "hex"), "hex")
    const encrypted = key.sign(Buffer.from(hash, "hex"))

    const signature = encrypted.r.toString("hex") + encrypted.s.toString("hex")

    __DEV__ && console.log("Encrypted hash: ", signature)

    return signature
}

const getTicketFingerprint = async (ticket: ApiTicket, event: ApiEvent) => {

    __DEV__ && console.log("Generating TOTP token using:", totpSecret)

    const totpToken = totp(totpSecret, {
        digits: 8,
        algorithm: "SHA-512",
        period: 10,
    })
    
    __DEV__ && console.log("Token ID: ", ticket.token_id)

    // Convert to hex using Buffer
    const tokenIDHex = Buffer.from(ticket.token_id).toString("hex")

    const fingerprint = `${event.pub_bc_address}/${tokenIDHex}/${totpToken}`

    const hashSha256 = await crypto.digestStringAsync(crypto.CryptoDigestAlgorithm.SHA256, fingerprint)

    return hashSha256
}