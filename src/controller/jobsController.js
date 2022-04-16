import jobs from "../models/Job.js";
import moment from "moment";

class JobController {

  static listarJobs = (req, res) => {
    jobs.find()
        .populate('usuario', 'nome')
        .exec((err, jobs) => {
          res.status(200).json(jobs)
        })
  }

  static listarJobPorId = (req, res) => {
    const id = req.params.id;

    jobs.findById(id)
        .populate('usuario')
        .exec((err, jobs) => {
            if(err) {
              res.status(404).send({message: `${err.message} - Id do Job não encontrado.`})
            } else {
              console.log(jobs)
              res.status(200).send(jobs);
            }
        })
  }

  static cadastrarJob = (req, res) => {
    const novaData = new Date();
    const intervalo = req.body.valorIntervalo;
    const horarioFixo = req.body.valorHorarioFixo;
    if (typeof intervalo === 'string' && intervalo.length > 0) {
      let hours = intervalo.split(':');
      novaData.setHours((Number(hours[0] - 3)), Number(hours[1]));
      req.body.valorIntervalo = novaData;
    } else if (typeof horarioFixo === 'string' && horarioFixo.length > 0) {
      let hours = horarioFixo.split(':');
      novaData.setHours((Number(hours[0] - 3)), Number(hours[1]));
      req.body.valorHorarioFixo = novaData;
    }
    let job = new jobs(req.body);

    job.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar job.`})
      } else {
        res.status(201).send(job.toJSON())
      }
    })
  }

  static atualizarJob = (req, res) => {
    const id = req.params.id;
    const body = req.body 
    jobs.findByIdAndUpdate(id, {$set: body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Job atualizado com sucesso!'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
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
    console.log(nomeUsuario);
    jobs.find({'usuario.nome': { '$regex': nomeUsuario, '$options': 'i'}})
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
    console.log(typeof dataCriacao + " " + dataCriacao)
    console.log(typeof dt + " " + (dt))
  
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