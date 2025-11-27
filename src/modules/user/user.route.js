import { Router } from "express";

import createUser from "./user.controller.js";
import validationMiddleware from "../../middlewares/validate.middleware.js";
import { registerSchema } from "./user.validation.js";

const router = Router();

router.post("/" , validationMiddleware(registerSchema) , createUser);

export default router;