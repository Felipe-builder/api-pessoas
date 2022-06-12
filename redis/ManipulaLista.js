import redis from "redis";
const client = redis.createClient();

export class ManipulaLista {
    constructor(){
        this.lista = client
    }

    async adiciona(chave, valor, dataExpiracao) {
        await client.set(chave, valor);
        client.exists(chave, dataExpiracao);
    }

    async buscaValor(chave) {
        return client.get(chave)
    }

    //`blacklist:${tokenHash}`
    async contemChave(chave) {
        const resultado = await client.exists(chave);
        return resultado === 1;
    }

    async deleta(chave) {
        await client.del(chave)
    }
}

