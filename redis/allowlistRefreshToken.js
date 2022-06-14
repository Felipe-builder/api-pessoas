import { ManipulaLista } from "./ManipulaLista.js";

export class AllowlistRefreshToken extends ManipulaLista {

    async redisConnect(){
        this.lista.on("error", (error) => {
            console.log(error);
        });
        await this.lista.connect();       
    };    
}
// refatorar para `allowlist-refresh-token:${tokenOpaco}` está aqui