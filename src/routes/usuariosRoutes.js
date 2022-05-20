import express from "express";

import { local, bearer } from "../utils/middlewares-autenticacao.js"
import UsuarioController from "../controller/usuariosController.js";

const router = express.Router();

router
    .get("/usuarios", UsuarioController.listarUsuarios)
    .post("/usuarios/login", local, UsuarioController.login)
    .get("/usuarios/busca-data", UsuarioController.listarUsuarioPorDataCriacao)
    .get("/usuarios/busca-nome", UsuarioController.listarUsuarioPorNome)
    .get("/usuarios/:id", bearer, UsuarioController.listarUsuarioPorId)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .put("/usuarios/:id", UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", bearer, UsuarioController.deletarUsuario)

export default router;