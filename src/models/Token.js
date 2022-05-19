import  jwt  from "jsonwebtoken";

export default class Token {
    static criarToken(usuario) {
        const payload = {
            id: usuario.id
        }

        const token = jwt.sign(payload, process.env.CHAVE_JWT);
        return token
    }
}