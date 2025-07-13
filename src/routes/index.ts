import { Router } from "express";
import authRouter from "./authRoutes";
import {profileRoutes} from "./profileRoutes";
import authMiddleware from "../middleware/authMiddleware";
import pocketRoutes from "./pocketRoutes";

const mainRouter = Router();

// public
mainRouter.use(authRouter);

// auth
mainRouter.use(authMiddleware)
mainRouter.use('/profile', profileRoutes)
mainRouter.use('/pocket', pocketRoutes)

export default mainRouter;