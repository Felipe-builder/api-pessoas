import redis from "redis";

const client = redis.createClient();

export async function redisConnect(){
    client.on("error", (error) => {
        console.log(error);
    });
    await client.connect();
};

export default client;