import redis from "redis";
const client = redis.createClient();

export class ManipulaLista {
    constructor(prefix){
        this.lista = client
        this.prefix = prefix
    }

    async adiciona(chave, valor, dataExpiracao) {
        await client.set(`${this.prefix}${chave}`, valor);
        client.exists(`${this.prefix}${chave}`, dataExpiracao);
    }

    async buscaValor(chave) {
        return client.get(`${this.prefix}${chave}`)
    }

    //`blacklist:${tokenHash}`
    async contemChave(chave) {
        const resultado = await client.exists(`${this.prefix}${chave}`);
        return resultado === 1;
    }

    async deleta(chave) {
        await client.del(`${this.prefix}${chave}`)
    }
}

