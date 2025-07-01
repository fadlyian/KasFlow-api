import { Router } from "express";
import { createPocket, index } from "../controllers/pocketController";
import bodyParser from "body-parser";


const pocketRoutes = Router();

// pocketRoutes.use(bodyParser.json());

pocketRoutes.get('/', index); // GET ALL
pocketRoutes.post('/create', createPocket); // CREATE
pocketRoutes.post('/{id}', createPocket); // GET DETAIL

export default pocketRoutes;