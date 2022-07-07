import passport from "passport";
import { UsuarioServices } from "../services/UsuarioServices.js";
import { TokenOpaco } from "../models/Token.js";

const tokenOpaco = new TokenOpaco();
const usuarioService = new UsuarioServices();


export async function local(req, res, next){
    passport.authenticate(
        'local',
        { session: false },
        (erro, usuario, info) => {
            if (erro && erro.name === 'InvalidArgumentError') {
                return res.status(401).json({ erro: erro.message});
            }

            if(erro) {
                return res.status(500).json({ erro: erro.message});
            }

            if(!usuario) {
                return res.status(401).json();
            }

            req.user = usuario;
            return next();
        }
    )(req, res, next);
}

export async function bearer(req, res, next) {
    passport.authenticate(
        'bearer',
        {session: false},
        (erro, usuario, info) => {
            if (erro && erro.name === 'JsonWebTokenError') {
                return res.status(401).json({ erro: erro.message })
            }

            if (erro && erro.name === 'TokenExpiredError') {
                return res.status(401).json({ erro: erro.message, expiradoEm: erro.expiredAt })
            }

            if (erro) {
                return res.status(500).json({ erro: erro.message })
            }

            if(!usuario) {
                return res.status(401).json();
            }

            req.token = info.token;
            req.user = usuario;
            return next();
        }
    )(req, res, next);
}

export async function refresh(req, res, next) {
    try {
        const { refreshToken } = req.body;
        const id = await tokenOpaco.verificaTokenOpaco(refreshToken);
        await invalidaRefreshToken(refreshToken);
        req.user = await usuarioService.listarPorId(id)
        return next();
    } catch(erro) {
        if (erro.name === 'InvalidArgumentError') {
            return res.status(401).json({erro: erro.message})
        }
        return res.status(500).json({erro: erro.message})
        
    }
} 
