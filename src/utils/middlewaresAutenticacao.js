import passport from "passport";
import { UsuarioServices } from "../services/UsuarioServices.js";
import { InvalidArgumentError } from "../erros/erros.js";
import { AllowlistRefreshToken } from "../../redis/allowlistRefreshToken.js";

const allowlistRefreshToken = new AllowlistRefreshToken();
const usuarioService = new UsuarioServices();

async function verificaRefreshToken(refreshToken) {
    if(!refreshToken) {
        throw new InvalidArgumentError('Refresh token não enviado');
    }

    const id = await allowlistRefreshToken.buscaValor(refreshToken);
    if (!id) {
        throw new InvalidArgumentError('Refresh token inválido!');
    }
    return id;
}

async function invalidaRefreshToken(refreshToken) {
    await allowlistRefreshToken.deleta(refreshToken);
}


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
        const id = await verificaRefreshToken(refreshToken);
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
