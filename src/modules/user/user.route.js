import { Router } from "express";

import { updateUserInfo } from "./user.controller.js";
import validationMiddleware from "../../middlewares/validate.middleware.js";
import { updateSchema } from "./user.validation.js";
import validateUser from "../../middlewares/verifyUser.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

router.patch("/update/" , validateUser , validationMiddleware(updateSchema) , upload.single("avatar")  ,updateUserInfo);

export default router;