//LIBS
import jwt from "jsonwebtoken";
import crypto from "crypto";
import moment from "moment";

// REDIS 
import { AllowlistRefreshToken } from "../../redis/allowlistRefreshToken.js";
import { BlocklistAccessToken } from "../../redis/blocklistAccessToken.js";

// ERRORS
import { InvalidArgumentError } from "../erros/erros.js"

// INSTANCES
const blocklistAccessToken = new BlocklistAccessToken();
const allowlistRefreshToken = new AllowlistRefreshToken();


export class Token {
    constructor(nome, expiracao) {
        this.nome = nome;
        this.expiracao = expiracao;
    }
}


export class AccessToken extends Token {

    constructor() {
        super('acess token', [15, 'm'])
    }

    criarTokenJWT(id) {
        this
        const payload = { id }
        const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: this.expiracao.join('') });
        return token
    }

    async verificaTokenJWT(token) {
        await this.verificaTokenNaBlacklist(token);
        const { id } = jwt.verify(token, process.env.CHAVE_JWT);
        return id;
    }

    async verificaTokenNaBlacklist(token) {
        const tokenNaBlacklist = await blocklistAccessToken.contemAccessToken(token);
        if (tokenNaBlacklist) {
            throw new jwt.JsonWebTokenError(`${this.nome} por logout!`);
        }
    }

    invalidaTokenJWT(token) {
        return blocklistAccessToken.adicionaAccessToken(token);
    }
}



export class TokenOpaco extends Token {

    constructor() {
        super('refresh token', [5, 'd'])
    }


    async criaTokenOpaco(id) {
        const tokenOpaco = crypto.randomBytes(24).toString('hex');
        const dataExpiracao = moment().add(this.expiracao[0], this.expiracao[1]).unix();
        await allowlistRefreshToken.adiciona(`allowlist-refresh-token:${tokenOpaco}`, id, dataExpiracao)
        return tokenOpaco;
    }

    async verificaTokenOpaco(token) {
        this.verificaTokenEnviado(token);
        const id = await allowlistRefreshToken.buscaValor(token);
        this.verificaTokenValido(id);
        return id;
    }

    verificaTokenValido(id) {
        if (!id) {
            throw new InvalidArgumentError(`${this.nome} inv??lido!`);
        }
    }

    verificaTokenEnviado(token) {
        if (!token) {
            throw new InvalidArgumentError(`${this.nome} n??o enviado`);
        }
    }

    async invalidaTokenOpaco(refreshToken) {
        await allowlistRefreshToken.deleta(refreshToken);
    }

}