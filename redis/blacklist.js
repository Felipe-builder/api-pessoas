import redis from "redis";

const client = redis.createClient();

export async function redisConnect(){
    client.on("error", (error) => {
        console.log(error);
    });
    client.on("connect", () => {
        console.log("Redis connected!");
    });
    console.log("conectado")
    await client.connect();
    console.log("conxexão feita")
};

export default client;