import { Router } from "express";
import { createPocket, deletePocket, getPocketDetail, index, updatePocket } from "../controllers/pocketController";
import { createPocketSchema, updatePocketSchema } from "../schemas/pocketSchemas";
import { validationData } from "../middleware/validationMiddleware";

const pocketRoutes = Router();

// pocketRoutes.use(bodyParser.json());

pocketRoutes.get('/', index); // GET ALL
pocketRoutes.post('/create', validationData(createPocketSchema), createPocket); // CREATE
pocketRoutes.get('/:id', getPocketDetail); // GET DETAIL
pocketRoutes.put('/:id/update', validationData(updatePocketSchema), updatePocket); // UPDATE POCKET
pocketRoutes.delete('/:id/delete', deletePocket);

export default pocketRoutes;