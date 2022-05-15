import mongoose from "mongoose";


const jobSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String,
      required: true,
      trim: true
      },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usuarios',
      required: true
    },
    status: {
      type: String,
      enum: ['ATIVO', 'INATIVO'],
      default: 'ATIVO',
      required: true,
      trim: true,
      uppercase: true
    },
    tipoRecorrencia: {
      type: String,
      enum: ['INTERVALO', 'HORÁRIO FIXO'],
      required: true,
      trim: true,
      uppercase: true
    },
    valorIntervalo: {
      type: Date,
    },
    valorHorarioFixo: {
      type: Date,
    }

  }
);

//below line will automatically generate createdAt and updatedAt fields
jobSchema.set('timestamps', true);

const jobs = mongoose.model("jobs", jobSchema);

export default jobs;