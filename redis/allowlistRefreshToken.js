import redis from "redis";
import { ManipulaLista } from "./ManipulaLista.js";

const allowlist = redis.createClient();

export async function redisConnect(){
    allowlist.on("error", (error) => {
        console.log(error);
    });
    await allowlist.connect();
};

const allowlistRefreshToken = new ManipulaLista(allowlist);
export { allowlistRefreshToken }