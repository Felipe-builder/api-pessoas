import  express  from "express";
import JobController from "../controller/jobsController.js";

const router = express.Router();

router.get("/usuarios", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
});

router
    .get("/jobs", JobController.listarJobs)
    .get("/jobs/busca-usuario", JobController.listarJobPorUsuario)
    .get("/jobs/busca-data", JobController.listarJobPorDataCriacao)
    .get("/jobs/:id", JobController.listarJobPorId)
    .post("/jobs", JobController.cadastrarJob)
    .put("/jobs/:id", JobController.atualizarJob)
    .delete("/jobs/:id", JobController.deletarJob)


export default router;