import mongoose from "mongoose";
// import moment from "moment";


const jobSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: true},
    status: {
      type: String,
      enum: ['ATIVO', 'INATIVO'],
      default: 'ATIVO',
      required: true
    },
    tipoRecorrencia: {
      type: String,
      enum: ['INTERVALO', 'HORÁRIO FIXO'],
      required: true
    },
    valorRecorrencia: {
      type: Date,
      default: Date.now(),
      required: true
    }
  }
)

const jobs = mongoose.model("jobs", jobSchema)

export default jobs;