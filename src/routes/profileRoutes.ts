import { Router } from "express";
import { profile, updateProfile } from "../controllers/profileController";

const profileRoutes = Router();

profileRoutes.get('/', profile);
profileRoutes.put('/update', updateProfile);

export {
    profileRoutes
}