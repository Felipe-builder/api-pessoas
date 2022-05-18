import Modelo from "../models/index.js";

export default class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async listarTudo() {
        return Modelo[this.nomeDoModelo].find()
    }

    async listarPorId(id) {
        return Modelo[this.nomeDoModelo].findById(id)
    }

    async listarUmRegistro(where = {}) {
        return Modelo[this.nomeDoModelo].find(where).exec()
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
