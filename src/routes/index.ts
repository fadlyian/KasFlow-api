import { Router } from "express";
import authRouter from "./authRoutes";

const mainRouter = Router();

mainRouter.use(authRouter);

export default mainRouter;