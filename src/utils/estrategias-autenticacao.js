import passport from "passport";
import passportLocal from "passport-local";
import passportBearer from "passport-http-bearer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { UsuarioServices } from "../services/UsuarioServices.js";
import { InvalidArgumentError } from "../erros/erros.js"
import { contemToken } from "../../redis/blocklistAccessToken.js";



const usuarioServices = new UsuarioServices()
const LocalStrategy = passportLocal.Strategy;
const BearerStrategy = passportBearer.Strategy;

function verificaUsuario(usuario) {
    if (!usuario) {
        throw new InvalidArgumentError('Não existe usuário com esse e-mail!')
    }
}

async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash)    
    if (!senhaValida) {
        throw new InvalidArgumentError('Senha ou e-mail inválidos')
    }
}

async function verificaTokenNaBlacklist(token) {
    const tokenNaBlacklist = await contemToken(token);
    if (tokenNaBlacklist) {
        throw new jwt.JsonWebTokenError('Token inválido por logout!');
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            const usuario = await usuarioServices.listarUmRegistro({'email': email});
            verificaUsuario(usuario);
            await verificaSenha(senha, usuario.senha);

            done(null, usuario);
        } catch(erro) {
            done(erro);
        }

    })
)

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                await verificaTokenNaBlacklist(token);
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                const usuario = await usuarioServices.listarPorId(payload.id);
                done(null, usuario, { token: token });
            } catch (erro) {
                done(erro);
            }

        }
    )
)

export default passport;