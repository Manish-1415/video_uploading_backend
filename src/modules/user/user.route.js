import { Router } from "express";

import createUser, { authUser, updateUserInfo } from "./user.controller.js";
import validationMiddleware from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema, updateSchema } from "./user.validation.js";
import validateUser from "../../middlewares/verifyUser.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

router.post("/" , validationMiddleware(registerSchema) , createUser);

router.post("/login/", validationMiddleware(loginSchema) , authUser);

router.patch("/update/" , validateUser , validationMiddleware(updateSchema) , upload.single("avatar")  ,updateUserInfo);

export default router;