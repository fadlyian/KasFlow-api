import { Router } from "express";
import { index, create, deleteTransaction, updateTransaction } from "../controllers/transactionController";

const transactionRoute = Router({mergeParams: true}); // to get the pocketId from the parent route

transactionRoute.get('/', index); // to get all transaction in a pocket
transactionRoute.post('/create', create); // to create a transaction in a pocket
transactionRoute.put('/:transactionId/update', updateTransaction); 
transactionRoute.delete('/:transactionId/delete', deleteTransaction); // to delete a transaction in a pocket

export default transactionRoute;