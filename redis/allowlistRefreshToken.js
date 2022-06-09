import redis from "redis";
import manipulaLista from "./manipulaLista.js";

const allowlist = redis.createClient();

export async function redisConnect(){
    allowlist.on("error", (error) => {
        console.log(error);
    });
    await allowlist.connect();
};

export default manipulaLista(allowlist);