import { Router } from "express";

import createUser, { authUser } from "./user.controller.js";
import validationMiddleware from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./user.validation.js";

const router = Router();

router.post("/" , validationMiddleware(registerSchema) , createUser);

router.post("/login/", validationMiddleware(loginSchema) , authUser);

export default router;