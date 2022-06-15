import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import redis from "redis";

const client = redis.createClient();

import { ManipulaLista } from "./ManipulaLista.js";


export class BlocklistAccessToken extends ManipulaLista {
    constructor(){
        super('blacklist:')
    }

    async redisConnect(){
        client.on("error", (error) => {
            console.log(error);
        });
        await client.connect();
    };
    
    geraTokenHash(token){
        return createHash('sha256')
                .update(token)
                .digest('hex');
    }
    async adicionaAccessToken(token) {
        const dtExpiracao = jwt.decode(token).exp;
        const tokenHash = this.geraTokenHash(token);
        await this.adiciona(tokenHash, '', dtExpiracao);
    }
    
    async contemAccessToken(token) {
        const tokenHash = this.geraTokenHash(token);
        return await this.contemChave(tokenHash);
    }
}
