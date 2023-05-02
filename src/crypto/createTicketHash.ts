import { ApiEvent, ApiTicket } from "@app/api/models";
import { env } from "@app/config/loadEnvironment";
import totp from "totp-generator";
import * as crypto from "expo-crypto";
import { Buffer } from "buffer";
import { ec } from "elliptic";
import { DateTime } from "luxon";

const totpSecret = env.TOTP_SECRET;

export const createTicketHash = async (ticket: ApiTicket, event: ApiEvent, privateKey: string) => {
  const { fingerprintHash, expirationDateSeconds } = await getTicketFingerprint(ticket, event);

  __DEV__ && console.log("Fingerprint:", fingerprintHash);

  __DEV__ && console.log("Private key:", privateKey);

  const encrypted = await (async () => {
    const curve = new ec("secp256k1");
    const key = curve.keyFromPrivate(privateKey, "hex");
    const encrypted = curve.sign(fingerprintHash, key, { canonical: true });
    return encrypted;
  })();

  const signature = JSON.stringify({
    r: encrypted.r.toString(10),
    s: encrypted.s.toString(10),
    eventID: event.event_id,
    ticketID: ticket.ticket_id,
  });

  __DEV__ && console.log("Encrypted hash: ", signature);

  return { signature, expirationDateSeconds };
};

// Returns a SHA256 hash of the ticket fingerprint (event address + token ID + TOTP token)
const getTicketFingerprint = async (ticket: ApiTicket, event: ApiEvent) => {
  __DEV__ && console.log("Generating TOTP token using:", totpSecret);

  const periodSeconds = 60 * 30; // 5 mins;
  const expirationDateSeconds =
    Math.floor(DateTime.now().toUnixInteger() / periodSeconds) * periodSeconds + periodSeconds;

  __DEV__ && console.log("Expiration date: ", expirationDateSeconds);

  const totpToken = await (async () =>
    totp(totpSecret, {
      digits: 8,
      algorithm: "SHA-512",
      period: periodSeconds,
      timestamp: Date.now(),
    }))();

  __DEV__ && console.log("TOTP token: ", totpToken);

  __DEV__ && console.log("Token ID: ", ticket.token_id);

  // Convert to hex using Buffer
  const fingerprint = `${event.pub_bc_address}/${ticket.token_id}/${totpToken}`;

  const fingerprintHash = await crypto.digestStringAsync(
    crypto.CryptoDigestAlgorithm.SHA256,
    fingerprint
  );

  return { fingerprintHash, expirationDateSeconds };
};
