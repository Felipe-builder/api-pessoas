import express from "express";
import UsuarioController from "../controller/usuariosController.js";

const router = express.Router();

router.get("/usuarios", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
});

router
    .get("/usuarios", UsuarioController.listarUsuarios)
    .get("/usuarios/busca-data", UsuarioController.listarUsuarioPorDataCriacao)
    .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
    .post("/usuarios/busca-nome", UsuarioController.listarUsuarioPorNome)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .put("/usuarios/:id", UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", UsuarioController.deletarUsuario)

export default router;