import usuarios from "../models/Usuario.js";
import moment from "moment";

class UsuarioController {

  static listarUsuarios = (req, res) => {
    usuarios.find((err, usuarios) => {
      res.status(200).json(usuarios)
  })
  }

  static listarUsuarioPorId = (req, res) => {
    const id = req.params.id;

    usuarios.findById(id, (err, usuarios) => {
      if(err) {
        res.status(404).send({message: `${err.message} - Id do Usuario não encontrado.`})
      } else {
        res.status(200).send(usuarios);
      }
    })
  }

  static cadastrarUsuario = (req, res) => {
    let usuario = new usuarios(req.body);

    usuario.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar usuario.`})
      } else {
        res.status(201).send(usuario.toJSON())
      }
    })
  }

  static atualizarUsuario = (req, res) => {
    const id = req.params.id;
    const body = req.body 
    usuarios.findByIdAndUpdate(id, {$set: body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Usuario atualizado com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static deletarUsuario = (req, res) => {
    const id = req.params.id;

    usuarios.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Usuario removido com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }


  static listarUsuarioPorNome = (req, res) => {
    const nome = req.body.nome
    usuarios.find({'nome': nome})
      .exec((err, usuarios) => {
        if(err) {
            res.status(404).send({message: `${err.message} - Não foi localizado usuarios por esse Usuário`})
        } else {
            res.status(200).send(usuarios)
        }
      })
  }

  static listarUsuarioPorDataCriacao = (req, res) => {
    const dataCriacao = new Date(req.query.dt_criacao);
    const dt = new Date(moment(dataCriacao).add(1, 'days'));
    console.log(typeof dataCriacao + " " + dataCriacao)
    console.log(typeof dt + " " + (dt))
  
    usuarios.find({'createdAt': { $gte: dataCriacao,
              $lte: dt} })
      .exec((err, usuarios) => {
        if(err) {
          res.status(404).send({message: `${err.message} - Não há usuarios regristado nessa data!`})
        } else {
          res.status(200).send(usuarios)
        }
      })
  }
}

export default UsuarioController