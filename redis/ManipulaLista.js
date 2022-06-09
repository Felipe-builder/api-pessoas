
export class ManipulaLista {
    
    constructor(lista) {
        this.lista = lista
    }

    async adiciona(chave, valor, dataExpiracao) {
        await this.lista.set(chave, valor);
        this.lista.exists(chave, dataExpiracao);
    }

    async buscaValor(chave) {
        return this.lista.get(chave)
    }

    //`blacklist:${tokenHash}`
    async contemChave(chave) {
        const resultado = await this.lista.exists(chave);
        return resultado === 1;
    }

    async deleta(chave) {
        await this.lista.del(chave)
    }
}

