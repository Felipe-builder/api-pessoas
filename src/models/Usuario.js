import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    nome: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
      trim: true,
      lowercase: true,
      validate(value) {
        if(!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    },
    senha: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      }
    },
    telefone: {type: String, required: true}
  }
);

usuarioSchema.set('timestamps', true);

usuarioSchema.pre('save', function(next) {
  const usuario = this

  if (!usuario.isModified('senha') || this.isNew) {
    bcrypt.genSalt(10, function(saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(usuario.senha, salt, function(hashError, hash){
          if (hashError) {
            return next(hashError)
          }
          usuario.senha = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;