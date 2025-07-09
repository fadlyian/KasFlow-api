import { Router } from "express";
import { index, create, deleteTransaction, updateTransaction } from "../controllers/transactionController";

const transactionRoute = Router();

transactionRoute.get('/:pocketId', index); // to get all transaction in a pocket
transactionRoute.post('/:pocketId/create', create); // to create a transaction in a pocket
transactionRoute.put('/:pocketId/update/:transactionId', updateTransaction); 
transactionRoute.delete('/:pocketId/delete/:transactionId', deleteTransaction); // to delete a transaction in a pocket

export default transactionRoute;