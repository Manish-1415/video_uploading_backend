import { Router } from "express";
import validationMiddleware from "../../middlewares/validate.middleware.js";
import { registerSchema } from "./auth.validation.js";
import { loginSchema } from "./auth.validation.js";
import validateUser from "../../middlewares/verifyUser.middleware.js"
import { logOutUser } from "./auth.controller.js";
import checkRefreshToken from "../../middlewares/verifyRefreshToken.middleware.js";

const router = Router();

router.post("/" , validationMiddleware(registerSchema) , createUser);

router.post("/login/", validationMiddleware(loginSchema) , authUser);

router.post("logout/", validateUser , logOutUser);

router.post("/refresh/", checkRefreshToken , )

export default router;