import jwt from "jsonwebtoken";
import crypto from "crypto";
import moment from "moment";

import * as allowlist from "../../redis/allowlistRefreshToken.js";


export default class Token {
    static criarTokenJWT(usuario) {
        const payload = {
            id: usuario._id
        }
        const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m'});
        return token
    }

    static criaTokenOpaco(usuario) {
        const tokenOpaco = crypto.randomBytes(24).toString('hex');
        const dataExpiracao = moment().add(5, 'd').unix();
        

        return tokenOpaco;
    }
}