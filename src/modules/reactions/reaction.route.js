import { Router } from "express";
import validateUser from "../../middlewares/verifyUser.middleware";
import validationMiddleware from "../../middlewares/validate.middleware";
import { reactionValidationSchema } from "./reaction.validation";
import { createReaction, getReactionOnVid } from "./reaction.controller";

const router = Router();

router.post("/:vid_id", validateUser , validationMiddleware(reactionValidationSchema) , createReaction);

router.get("/:vid_id", validateUser , getReactionOnVid);

export default router;