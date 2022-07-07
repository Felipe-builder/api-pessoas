// Routers
import { Router } from "express";

import { readFile } from 'fs/promises';


// Swagger
import swaggerUi from "swagger-ui-express";
const swaggerFile = JSON.parse(await readFile(new URL("../../swagger/swagger_output.json", import.meta.url)));

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true}));

export default router;
