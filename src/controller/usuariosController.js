import moment from "moment";

import { UsuarioServices } from "../services/UsuarioServices.js"
const usuarioServices = new UsuarioServices()

import { AccessToken, TokenOpaco } from "../models/Token.js";
const accessToken = new AccessToken();
const tokenOpaco = new TokenOpaco();
import { BlocklistAccessToken } from "../../redis/blocklistAccessToken.js";

import usuarios from "../models/Usuario.js";

const blocklist = new BlocklistAccessToken();

class UsuarioController {

  static async listarUsuarios(req, res) {
    try {
      const usuariosEncontrados = await usuarioServices.listarTudo()
      return res.status(200).json(usuariosEncontrados)
    } catch(err) {
      return res.status(500).json({message: err.message})
    }
  }

  static async login(req, res) {
    const id = req.user._id.toString()
    const token = accessToken.criarTokenJWT(id);
    const refreshToken = await tokenOpaco.criaTokenOpaco(id);
    res.set('Authorization', token);
    return res.status(200).json({ refreshToken });
  }

  static async logout(req, res) {
    try {
      const token = req.token;
      await accessToken.invalidaTokenJWT(token);
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({message: err.message });
    }
  }

  static async listarUsuarioPorId(req, res) {
    const { params: {id}} = req;

    try {
      const usuarioEncontrado = await usuarioServices.listarPorId(id)
      return res.status(200).json(usuarioEncontrado);
    } catch(err) {
      return res.status(404).json({message: `${err.message} - Id do Usuario não encontrado.`})
    }
  }

  static async cadastrarUsuario(req, res) {
    let usuario = new usuarios(req.body);

    try {
      const usuarioCadastrado = await usuarioServices.cadastrar(usuario)
      return res.status(201).json(usuarioCadastrado)
    } catch(err) {
      return res.status(500).json({message: `${err.message} - falha ao cadastrar usuario.`})
    }
  }


  //ainda precisa verificar validação de dados enviados
  static async atualizarUsuario(req, res) {
    const id = req.params.id;
    const body = req.body 

    try {
      
      await usuarioServices.atualizar(id, body)
      return res.status(200).json({message: 'Usuario atualizado com sucesso!'})
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  }

  static async deletarUsuario(req, res) {
    const id = req.params.id;

    try {
      await usuarioServices.remover(id)
      return res.status(200).json({message: 'Usuario removido com sucesso!'})
    } catch (err) {
      res.status(500).json({message: err.message})      
    }
  }


  static async listarUsuarioPorNome(req, res) {
    const nome = req.query.usuario_nome
    try {
    const usuariosEncontrados = await usuarioServices.listarUmRegistro({'nome': { '$regex': nome, '$options': 'i'}})
    return res.status(200).json(usuariosEncontrados)
    } catch (err) {
      return res.status(404).json({message: `${err.message} - Não foi localizado usuarios por esse Usuário`})      
    }
  }

  static async listarUsuarioPorDataCriacao(req, res) {
    const dataCriacao = new Date(req.query.dt_criacao);
    const dt = new Date(moment(dataCriacao).add(1, 'days'));  

    try {
      const usuariosEncontrados = await usuarios.find({'createdAt': { $gte: dataCriacao, $lte: dt} }).exec()  
      return res.status(200).json(usuariosEncontrados)
    } catch (err) {
      return res.status(404).json({message: `${err.message} - Não há usuarios regristado nessa data!`})
    }
  }
}

export default UsuarioController