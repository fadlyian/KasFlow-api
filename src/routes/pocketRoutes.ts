import { Router } from "express";
import { createPocket, deletePocket, getPocketDetail, index, updatePocket } from "../controllers/pocketController";
import { createPocketSchema, updatePocketSchema } from "../schemas/pocketSchemas";
import { validationData } from "../middleware/validationMiddleware";
import transactionRoute from "./transactionRoutes";

const pocketRoutes = Router();

// pocketRoutes.use(bodyParser.json());

pocketRoutes.get('/', index); // GET ALL
pocketRoutes.post('/create', validationData(createPocketSchema), createPocket); // CREATE
pocketRoutes.get('/:id', getPocketDetail); // GET DETAIL
pocketRoutes.put('/:id/update', validationData(updatePocketSchema), updatePocket); // UPDATE POCKET
pocketRoutes.delete('/:id/delete', deletePocket);

// transaction Route
pocketRoutes.use('/:pocketId/transaction/', transactionRoute);

export default pocketRoutes;