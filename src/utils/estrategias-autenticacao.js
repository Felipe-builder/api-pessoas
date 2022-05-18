import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";

import { UsuarioServices } from "../services/UsuarioServices.js";
import { InvalidArgumentError } from "../erros/erros.js"
// const InvalidArgumentError = new erros

const usuarioServices = new UsuarioServices()
const LocalStrategy = passportLocal.Strategy;

function verificaUsuario(usuario) {
    if (!usuario) {
        throw new InvalidArgumentError('Não existe usuário com esse e-mail')
    }
}

async function verificaSenha(senha, senhaHash) {
    bcrypt.compare(senha, senhaHash, function(err, result) {
        if (err) {
            return new InvalidArgumentError('Senha ou e-mail inválidos')
        } else {
            return result
        }
        // result == false
    });
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            const usuario = await usuarioServices.listarUmRegistro({'email': email});
            console.log(usuario)
            verificaUsuario(usuario)
            await verificaSenha(senha, usuario.senha)

            done(null, usuario)
        } catch(erro) {
            done(erro);
        }

    })
)

export default passport;