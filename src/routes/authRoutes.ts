import { Router, Express } from 'express';
import {
    register,
    login,
} from '../controllers/authController';
import bodyParser from 'body-parser';
import { validationData } from '../middleware/validationMiddleware';
import { userLoginSchema, userRegisterSchema } from '../schemas/userSchemas';

const authRouter = Router();

authRouter.use(bodyParser.json());
// Register a new user
authRouter.post('/register', validationData(userRegisterSchema), register);

// Login user
authRouter.post('/login', validationData(userLoginSchema), login);

// Logout user
// authRouter.post('/logout', logout);

// // Refresh JWT token
// authRouter.post('/refresh-token', refreshToken);

// // Get current user profile (protected route)
// authRouter.get('/profile', getProfile);

export default authRouter;