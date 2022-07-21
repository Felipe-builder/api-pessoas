import moment from "moment";

import jobs from "../models/Job.js";
import { JobServices } from "../services/JobServices.js";
import { DataUtils } from "../utils/DataUtils.js";
const jobServices = new JobServices()

class JobController {

  static async listarJobs(req, res) {
    try {
      const jobs = await jobServices.listarTudo()
      return res.status(200).json(jobs)
    } catch(err) {
      return res.status(500).json(err.message)
    }

  }

  static async listarJobPorId(req, res) {
    const { id } = req.params;

    try {
      const jobEncontrado = await jobServices.listarPorId(id)
      return res.status(200).json(jobEncontrado);
    } catch (err) {
      return res.status(404).json({message: `${err.message} - Id do Job não encontrado.`})
    }
  }

  static async cadastrarJob(req, res) {
    const { valorIntervalo, valorHorarioFixo } = req.body
    console.log(req.body)
    if (valorIntervalo) {
      req.body.valorIntervalo = DataUtils.modificaValorIntervalo(valorIntervalo)
    } 
    if (valorHorarioFixo) {
      req.body.valorHorarioFixo = DataUtils.modificaValoHorarioFixor(valorHorarioFixo);
    }
    const job = req.body;
    try {
      const jobCriado = await jobServices.cadastrar(job)
      return res.status(201).json(jobCriado)
    } catch(err) {
      return res.status(500).json({message: `${err.message} - falha ao cadastrar job.`})
    }
  }

  static async atualizarJob(req, res) {
    const { id } = req.params;
    const body = req.body 

    try {
      await jobServices.atualizar(id, body)
      return res.status(200).json({message: 'Job atualizado com sucesso!'})
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  }

  static async deletarJob(req, res) {
    const { id } = req.params;
    try {
      await jobServices.remover(id)
      return res.status(200).send({message: 'Job removido com sucesso!'})
    } catch(err) {
      return res.status(500).send({message: err.message})
    }

  }

  static async listarJobPorUsuarioID(req, res) {
    const { usuario_id: usuarioID} = req.query
    try {
      const jobs =  await jobServices.listarUsuarioPorId(usuarioID);
      return res.status(200).send(jobs)
    } catch (err) {
      return res.status(404).json({message: `${err.message} - Não foi localizado Jobs por esse Usuário`})
    }

  }

  static listarJobPorNomeUsuario = (req, res) => {
    const { usuario_nome: nomeUsuario} = req.query;
    // { 'usuario.nome' : { '$regex': nomeUsuario, '$options': 'i'}}
    jobs.find()
      .populate({
        path: 'usuario',
        match: { 'nome' : { '$regex': nomeUsuario, '$options': 'i'} },
      })
      .exec((err, jobs) => {
        if(err) {
            res.status(404).send({message: `${err.message} - Não foi localizado jobs por esse Usuário`})
        } else {
            res.status(200).send(jobs)
        }
      })
  }

  static listarJobPorDataCriacao = (req, res) => {
    const dataCriacao = new Date(req.query.dt_criacao);
    const dt = new Date(moment(dataCriacao).add(1, 'days'));
  
    jobs.find({'createdAt': { $gte: dataCriacao,
              $lte: dt} })
      .populate('usuario', 'nome')
      .exec((err, jobs) => {
        if(err) {
          res.status(404).send({message: `${err.message} - Não há jobs regristado nessa data!`})
        } else {
          res.status(200).send(jobs)
        }
      })
  }
}

export default JobController