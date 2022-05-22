import { createClient } from "redis";

const client = createClient({ prefix: 'blacklist:'}); 

export default client;