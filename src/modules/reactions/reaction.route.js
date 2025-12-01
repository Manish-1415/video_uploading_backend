import { Router } from "express";
import validateUser from "../../middlewares/verifyUser.middleware";
import validationMiddleware from "../../middlewares/validate.middleware";
import { reactionValidationSchema } from "./reaction.validation";

const router = Router();

router.post("/:id" , validateUser , validationMiddleware(reactionValidationSchema) , )

export default router;