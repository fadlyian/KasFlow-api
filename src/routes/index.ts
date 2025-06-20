import { Router } from "express";
import authRouter from "./authRoutes";
import {profileRoute} from "./profileRoutes";
import authMiddleware from "../middleware/authMiddleware";

const mainRouter = Router();

// public
mainRouter.use(authRouter);

// auth
mainRouter.use(authMiddleware)
mainRouter.use(profileRoute)

export default mainRouter;