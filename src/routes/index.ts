import { Router } from "express";
import authRouter from "./authRoutes";
import {profileRoute} from "./profileRoutes";
import authMiddleware from "../middleware/authMiddleware";
import pocketRoutes from "./pocketRoutes";

const mainRouter = Router();

// public
mainRouter.use(authRouter);

// auth
mainRouter.use(authMiddleware)
mainRouter.use(profileRoute)
mainRouter.use('/pocket', pocketRoutes)

export default mainRouter;