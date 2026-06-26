import { registerUserController, refreshTokenController, loginUserController, logoutController } from "../controller/authController.js"
import express from "express";
import { validate } from "../middleware/validatorMiddleware.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), registerUserController);
authRouter.post("/login", validate(loginSchema), loginUserController);
authRouter.post("/refresh", refreshTokenController);
authRouter.post("/logout", logoutController);

export default authRouter;

