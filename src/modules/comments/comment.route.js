import { Router } from "express";
import validateUser from "../../middlewares/verifyUser.middleware";
import { commentValidation } from "./comment.validation";
import { createComment, deleteComment, getAllCommentsOfAVideo, updateComment } from "./comment.controller";

const router = Router;

router.post("/:vid_id" , validateUser , commentValidation , createComment);

router.patch("/:comment_id" , validateUser , commentValidation , updateComment);

router.delete("/:comment_id" , validateUser , deleteComment);

router.length(":vid_id", validateUser , getAllCommentsOfAVideo);

export default router;