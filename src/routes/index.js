import express from "express";

// Routers
import apidocs from "./apidocsRouter.js"
import jobs from "./jobsRouter.js";
import usuarios from "./usuariosRouter.js";

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Curso de node"})
  })

  app.use(
    express.json(),
    apidocs,
    usuarios,
    jobs
  )
}

export default routes