import Services from "./Services.js";
import Modelo from "../models/index.js";


export class JobServices extends Services {
    constructor(){
        super('Job')
    }

    async listarTudo() {
        return Modelo[this.nomeDoModelo]
            .find()
            .populate('usuario', 'nome')
            .exec();
    }

    async listarPorId(id) {
        return Modelo[this.nomeDoModelo]
            .findById(id)
            .populate('usuario')
            .exec();
    }

    async remover(id) {
        return Modelo[this.nomeDoModelo]
            .findByIdAndDelete(id);
    }

    async listarUsuarioPorId(usuarioID) {
        return Modelo[this.nomeDoModelo]
            .find({'usuario': usuarioID})
            .populate('usuario', 'nome');
    }
}
