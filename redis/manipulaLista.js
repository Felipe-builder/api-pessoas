
export class ManipulaLista {
    
    constructor(lista) {
        this.lista = lista
    }

    static async adiciona(chave, valor, dataExpiracao) {
        await lista.set(chave, valor);
        lista.exists(chave, dataExpiracao);
    }

    static async buscaValor(chave) {
        return lista.get(chave)
    }

    //`blacklist:${tokenHash}`
    static async contemChave(chave) {
        const resultado = await blacklist.exists(chave);
        return resultado === 1;
    }

    static async deleta(chave) {
        await lista.del(chave)
    }
}

