import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import { promisify } from "util";

import blacklist from "./blacklist.js";

const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

function geraTokenHash(token){
    return createHash('sha256')
            .update(token)
            .digest('hex');
}

export async function adiciona(token) {
    const dtExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await setAsync(tokenHash, '');
    blacklist.expireAt(tokenHash, dtExpiracao);
}

export async function contemToken(token) {
    const tokenHash = geraTokenHash(token);
    const resultado = await existsAsync(tokenHash);
    return resultado === 1;
}