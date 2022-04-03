import mongoose from "mongoose";


const jobSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: true},
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuarios',
      required: true
    },
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