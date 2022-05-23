import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import { promisify } from "util";

import * as redisConnect from "./blacklist.js";

const blacklist = redisConnect.default


// const existsAsync = promisify(blacklist.default.exists).bind(blacklist.default);
// const setAsync = promisify(blacklist.default.set).bind(blacklist.default);

function geraTokenHash(token){
    return createHash('sha256')
            .update(token)
            .digest('hex');
}
export async function adiciona(token) {
    const dtExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await blacklist.set(`blacklist:${tokenHash}`, '');
    blacklist.exists(`blacklist:${tokenHash}`, dtExpiracao);
}

export async function contemToken(token) {
    const tokenHash = geraTokenHash(token);
    const resultado = await blacklist.exists(`blacklist:${tokenHash}`);
    return resultado === 1;
}