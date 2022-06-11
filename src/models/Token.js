import jwt from "jsonwebtoken";
import crypto from "crypto";
import moment from "moment";

import { AllowlistRefreshToken } from "../../redis/allowlistRefreshToken.js";
const allowlistRefreshToken = new AllowlistRefreshToken();

export default class Token {
    static criarTokenJWT(usuario) {
        const payload = {
            id: usuario._id
        }
        const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m'});
        return token
    }

    static async criaTokenOpaco(usuario) {
        const tokenOpaco = crypto.randomBytes(24).toString('hex');
        const dataExpiracao = moment().add(5, 'd').unix();
        await allowlistRefreshToken.adiciona(`allowlist-refresh-token:${tokenOpaco}`, usuario._id.toString(), dataExpiracao)
        return tokenOpaco;
    }
}