import { Router } from "express";
import { index, create, deleteTransaction } from "../controllers/transactionController";

const transactionRoute = Router();

transactionRoute.get('/:pocketId', index); // to get all transaction in a pocket
transactionRoute.post('/:pocketId/create', create); // to create a transaction in a pocket
transactionRoute.delete('/:pocketId/delete/:transactionId', deleteTransaction); // to delete a transaction in a pocket

export default transactionRoute;