import express from "express";

import * as middlewaresAutenticacao from "../utils/middlewaresAutenticacao.js";
import UsuarioController from "../controller/usuariosController.js";

const router = express.Router();

router
    .post("/usuarios/login", middlewaresAutenticacao.local, UsuarioController.login)
    .post("/usuarios/atualiza_token", middlewaresAutenticacao.refresh, UsuarioController.login)
    .get("/usuarios/logout", middlewaresAutenticacao.bearer, UsuarioController.logout)
    .get("/usuarios", UsuarioController.listarUsuarios)
    .get("/usuarios/busca-data", UsuarioController.listarUsuarioPorDataCriacao)
    .get("/usuarios/busca-nome", UsuarioController.listarUsuarioPorNome)
    .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .put("/usuarios/:id", middlewaresAutenticacao.bearer, UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", middlewaresAutenticacao.bearer, UsuarioController.deletarUsuario)

export default router;