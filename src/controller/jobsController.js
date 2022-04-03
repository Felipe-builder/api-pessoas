import jobs from "../models/Job.js";
import usuarios from "../models/Usuario.js";

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
                res.status(200).send(jobs);
            }
        })
  }

  static cadastrarJob = (req, res) => {
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

  static listarJobPorUsuario = (req, res) => {
    const usuario = req.query.usuario
    console.log(usuario)
    jobs.find({'usuario': usuario}, {}, (err, jobs) => {
        if(err) {
            res.status(400).send({message: `${err.message} - Não foi localizado Jobs por esse Usuário`})
        } else {
            res.status(200).send(jobs)
        }
    })
  }
}

export default JobController