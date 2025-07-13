import { Router } from "express";
import { profile, updateProfile, changePassword } from "../controllers/profileController";

const profileRoutes = Router();

profileRoutes.get('/', profile);
profileRoutes.put('/update', updateProfile);
profileRoutes.post('/change-password', changePassword);

export {
    profileRoutes
}