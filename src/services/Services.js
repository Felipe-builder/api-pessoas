import Modelo from "../models/index.js";
import { InvalidArgumentError } from "../erros/erros.js"

export default class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async listarTudo(where = {}) {
        const lista = await Modelo[this.nomeDoModelo].find(where)
        return lista;
    }

    async listarPorId(id) {
        const dado = await Modelo[this.nomeDoModelo].findById(id)
        if (!dado) {
            throw new InvalidArgumentError('Id não encontrado')
        }
        return dado
    }

    async listarUmRegistro(where = {}) {
        return Modelo[this.nomeDoModelo].findOne(where).exec()
    }

    async cadastrar(dados) {
        return Modelo[this.nomeDoModelo].create(dados)
    }

    async atualizar(id, dados) {
        return Modelo[this.nomeDoModelo].findByIdAndUpdate(id, {$set: dados})    
    }

    async remover(id) {
        return Modelo[this.nomeDoModelo].findByIdAndDelete(id) 
    }
}
