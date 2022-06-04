import express from "express";

import * as middlewaresAutenticacao from "../utils/middlewaresAutenticacao.js";
import UsuarioController from "../controller/usuariosController.js";

const router = express.Router();

router
    .get("/usuarios", UsuarioController.listarUsuarios)
    .post("/usuarios/login", middlewaresAutenticacao.local, UsuarioController.login)
    .get("/usuarios/logout", middlewaresAutenticacao.bearer, UsuarioController.logout)
    .get("/usuarios/busca-data", UsuarioController.listarUsuarioPorDataCriacao)
    .get("/usuarios/busca-nome", UsuarioController.listarUsuarioPorNome)
    .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .put("/usuarios/:id", middlewaresAutenticacao.bearer, UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", middlewaresAutenticacao.bearer, UsuarioController.deletarUsuario)

export default router;