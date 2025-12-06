import { Router } from "express";
import validateUser from "../../middlewares/verifyUser.middleware";
import { commentValidation } from "./comment.validation";
import { createComment, updateComment } from "./comment.controller";

const router = Router;

router.post("/:vid_id" , validateUser , commentValidation , createComment);

router.patch("/:vid_id" , validateUser , commentValidation , updateComment);

export default router;