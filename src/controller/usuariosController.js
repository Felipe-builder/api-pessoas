import moment from "moment";

import Services from "../services/Services.js"
const UsuarioService = new Services('Usuario')

import usuarios from "../models/Usuario.js";

class UsuarioController {

  static async listarUsuarios(req, res) {
    try {
      const usuariosEncontrados = await UsuarioService.listarTudo()
      return res.status(200).json(usuariosEncontrados)
    } catch(err) {
      return res.status(500).json({message: err.message})
    }
  }

  static async listarUsuarioPorId(req, res) {
    const id = req.params.id;

    try {
      const usuarioEncontrado = await UsuarioService.listarPorId(id)
      return res.status(200).send(usuarioEncontrado);
    } catch(err) {
      return res.status(404).send({message: `${err.message} - Id do Usuario não encontrado.`})
    }
  }

  static async cadastrarUsuario(req, res) {
    let usuario = new usuarios(req.body);

    try {
      const usuarioCadastrado = await UsuarioService.cadastrar(usuario)
      return res.status(201).send(usuarioCadastrado)
    } catch(err) {
      return res.status(500).send({message: `${err.message} - falha ao cadastrar usuario.`})
    }
  }


  //verificar validação de dados enviados
  static async atualizarUsuario(req, res) {
    const id = req.params.id;
    const body = req.body 

    try {
      
      await UsuarioService.atualizar(id, body)
      return res.status(200).json({message: 'Usuario atualizado com sucesso!'})
    } catch (err) {
      return res.status(500).send({message: err.message})
    }
  }

  static async deletarUsuario(req, res) {
    const id = req.params.id;

    try {
      await UsuarioService.remover(id)
      return res.status(200).send({message: 'Usuario removido com sucesso!'})
    } catch (err) {
      res.status(500).send({message: err.message})      
    }
  }


  static async listarUsuarioPorNome(req, res) {
    const nome = req.query.usuario_nome
    try {
    const usuariosEncontrados = await usuarios.find({'nome': { '$regex': nome, '$options': 'i'}}).exec()  
    return res.status(200).send(usuariosEncontrados)
    } catch (err) {
      return res.status(404).send({message: `${err.message} - Não foi localizado usuarios por esse Usuário`})      
    }
  }

  static async listarUsuarioPorDataCriacao(req, res) {
    const dataCriacao = new Date(req.query.dt_criacao);
    const dt = new Date(moment(dataCriacao).add(1, 'days'));  

    try {
      const usuariosEncontrados = await usuarios.find({'createdAt': { $gte: dataCriacao, $lte: dt} }).exec()  
      return res.status(200).send(usuariosEncontrados)
    } catch (err) {
      return res.status(404).send({message: `${err.message} - Não há usuarios regristado nessa data!`})
    }
  }
}

export default UsuarioController