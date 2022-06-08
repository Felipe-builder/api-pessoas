import  jwt  from "jsonwebtoken";
import crypto from "crypto";

export default class Token {
    static criarTokenJWT(usuario) {
        const payload = {
            id: usuario._id
        }
        const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m'});
        return token
    }

    static criaTokenOpaco() {
        const tokenOpaco = crypto.randomBytes(24).toString('hex');
        return tokenOpaco;
    }
}