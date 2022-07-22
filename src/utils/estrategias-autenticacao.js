// LIBS
import passport from "passport";
import passportLocal from "passport-local";
import passportBearer from "passport-http-bearer";
import bcrypt from "bcrypt";

// SERVICES
import { UsuarioServices } from "../services/UsuarioServices.js";

// MODELS
import { AccessToken } from "../models/Token.js";

// INSTANCES
const accessToken = new AccessToken();
const usuarioServices = new UsuarioServices()
const LocalStrategy = passportLocal.Strategy;
const BearerStrategy = passportBearer.Strategy;

// FUNCTIONS
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
                const id = await accessToken.verificaTokenJWT(token);
                const usuario = await usuarioServices.listarPorId(id);
                done(null, usuario, { token: token });
            } catch (erro) {
                done(erro);
            }

        }
    )
)

export default passport;