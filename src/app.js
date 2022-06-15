import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import { BlocklistAccessToken } from "../redis/blocklistAccessToken.js";
import { AllowlistRefreshToken } from "../redis/allowlistRefreshToken.js"
import EstrategiasAutenticacao from "./utils/index.js";



db.on("error", console.log.bind(console, 'Erro ao se conectar'));
db.once("open", () => {
  console.log('conexão ao database feita com sucesso')
});

const app = express();

app.use(bodyParser.json());

await new BlocklistAccessToken().redisConnect();
await new AllowlistRefreshToken().redisConnect();

app.use(cors());

routes(app);

export default app;
