import { Router } from "express";
import { profile } from "../controllers/profileController";

const profileRoute = Router();

profileRoute.get('/profile', profile);

export {
    profileRoute
}