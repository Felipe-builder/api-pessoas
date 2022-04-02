import express from "express";
import jobs from "./jobsRouter.js";
import usuarios from "./usuariosRoutes.js";

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Curso de node"})
  })

  app.use(
    express.json(),
    usuarios,
    jobs
  )
}

export default routes