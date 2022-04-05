import  express  from "express";
import JobController from "../controller/jobsController.js";

const router = express.Router();

router
    .get("/jobs", JobController.listarJobs)
    .get("/jobs/busca-usuario", JobController.listarJobPorUsuario)
    .get("/jobs/busca-data", JobController.listarJobPorDataCriacao)
    .get("/jobs/:id", JobController.listarJobPorId)
    .post("/jobs", JobController.cadastrarJob)
    .put("/jobs/:id", JobController.atualizarJob)
    .delete("/jobs/:id", JobController.deletarJob)


export default router;