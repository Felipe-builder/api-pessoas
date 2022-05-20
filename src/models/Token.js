import  jwt  from "jsonwebtoken";

export default class Token {
    static criarTokenJWT(usuario) {
        const payload = {
            id: usuario._id
        }
        const token = jwt.sign(payload, process.env.CHAVE_JWT);
        console.log(token)
        return token
    }
}