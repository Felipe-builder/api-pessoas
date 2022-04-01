import express from "express";
import db from "./config/dbConnect.js"
// import routes from "./routes/index.js"

db.on("error", console.log.bind(console, 'Erro ao se conectar'))
db.once("open", () => {
  console.log('conexão ao database feita com sucesso')
})

const app = express();
// app.use(express.json())
// routes(app);
app.use(express.json())


export default app
