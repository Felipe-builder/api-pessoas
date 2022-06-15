import { ManipulaLista } from "./ManipulaLista.js";

export class AllowlistRefreshToken extends ManipulaLista {
    constructor(){
        super('allowlist-refresh-token:')
    }


    async redisConnect(){
        this.lista.on("error", (error) => {
            console.log(error);
        });
        await this.lista.connect();       
    };    
}
