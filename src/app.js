import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import cors from "cors"
import bodyParser from "body-parser"

db.on("error", console.log.bind(console, 'Erro ao se conectar'))
db.once("open", () => {
  console.log('conexão ao database feita com sucesso')
})

const app = express();
app.use(cors()) 

app.use(bodyParser.json())

routes(app);

export default app
