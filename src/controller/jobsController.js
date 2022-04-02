import jobs from "../models/Job.js";

class JobController {

  static listarJobs = (req, res) => {
    jobs.find((err, jobs) => {
      res.status(200).json(jobs)
  })
  }

  static listarJobPorId = (req, res) => {
    const id = req.params.id;

    jobs.findById(id, (err, jobs) => {
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
}

export default JobController