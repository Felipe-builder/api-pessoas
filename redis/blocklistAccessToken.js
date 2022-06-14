import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import redis from "redis";

import { ManipulaLista } from "./ManipulaLista.js";
const manipulaLista = new ManipulaLista();


const client = redis.createClient();

export async function redisConnect(){
    client.on("error", (error) => {
        console.log(error);
    });
    await client.connect();
};

function geraTokenHash(token){
    return createHash('sha256')
            .update(token)
            .digest('hex');
}
export async function adiciona(token) {
    const dtExpiracao = jwt.decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await manipulaLista.adiciona(`blacklist:${tokenHash}`, '', dtExpiracao);
}

export async function contemToken(token) {
    const tokenHash = geraTokenHash(token);
    return await manipulaLista.contemChave(`blacklist:${tokenHash}`);
}