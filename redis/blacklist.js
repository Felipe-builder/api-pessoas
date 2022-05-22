import redis from "redis";

const client = redis.createClient({prefix:"blacklist:"});

export async function redisConnect(){
    
    client.on("error", (error) => {
        console.log(error);
    });
    client.on("connect", () => {
        console.log("Redis connected!");
    });
    await client.connect();
};

export default client;