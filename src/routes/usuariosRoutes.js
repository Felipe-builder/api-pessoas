import express from "express";
import passport from "passport";

import UsuarioController from "../controller/usuariosController.js";

const router = express.Router();

router
    .get("/usuarios", UsuarioController.listarUsuarios)
    .post("/usuarios/login", passport.authenticate('local', {session: false}), UsuarioController.login)
    .get("/usuarios/busca-data", UsuarioController.listarUsuarioPorDataCriacao)
    .get("/usuarios/busca-nome", UsuarioController.listarUsuarioPorNome)
    .get("/usuarios/:id", passport.authenticate('bearer', {session: false}), UsuarioController.listarUsuarioPorId)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .put("/usuarios/:id", UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", passport.authenticate('bearer', {session: false}), UsuarioController.deletarUsuario)

export default router;