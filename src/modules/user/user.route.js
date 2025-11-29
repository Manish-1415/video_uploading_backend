import { Router } from "express";

import { getUser, changePassword, updateUserInfo } from "./user.controller.js";
import validationMiddleware from "../../middlewares/validate.middleware.js";
import { newPasswordSchema, updateSchema } from "./user.validation.js";
import validateUser from "../../middlewares/verifyUser.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

router.patch("/update/" , validateUser , validationMiddleware(updateSchema) , upload.single("avatar")  ,updateUserInfo);

router.get("/" , validateUser , getUser);

router.patch("/new_password/" , validateUser , validationMiddleware(newPasswordSchema), changePassword);

export default router;