import moment from "moment";

import jobs from "../models/Job.js";
import { JobServices } from "../services/JobServices.js";
import { DataUtils } from "../utils/DataUtils.js";
const jobService = new JobServices()

class JobController {

  static async listarJobs(req, res) {
    try {
      const jobs = await jobService.listarTudo()
      return res.status(200).json(jobs)
    } catch(err) {
      return res.status(500).json(err.message)
    }

  }

  static async listarJobPorId(req, res) {
    const id = req.params.id;

    try {
      const jobEncontrado = await jobService.listarPorId(id)
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
      const jobCriado = await jobService.cadastrar(job)
      return res.status(201).json(jobCriado)
    } catch(err) {
      return res.status(500).json({message: `${err.message} - falha ao cadastrar job.`})
    }
  }

  static async atualizarJob(req, res) {
    const id = req.params.id;
    const body = req.body 

    try {
      await jobService.atualizar(id, body)
      return res.status(200).json({message: 'Job atualizado com sucesso!'})
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  }

  static deletarJob = (req, res) => {
    const id = req.params.id;

    jobs.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Job removido com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static listarJobPorUsuarioID = (req, res) => {
    const usuarioID = req.query.usuario_id
    jobs.find({'usuario': usuarioID})
      .populate('usuario', 'nome')
      .exec((err, jobs) => {
        if(err) {
            res.status(404).send({message: `${err.message} - Não foi localizado Jobs por esse Usuário`})
        } else {
            res.status(200).send(jobs)
        }
      })
  }

  static listarJobPorNomeUsuario = (req, res) => {
    const nomeUsuario = req.query.usuario_nome;
    jobs.find({ 'usuario.nome' : { '$regex': nomeUsuario, '$options': 'i'}})
      .populate('usuario', 'nome')
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