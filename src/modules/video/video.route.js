import { Router } from "express";
import validateUser from "../../middlewares/verifyUser.middleware.js";
import validationMiddleware from "../../middlewares/validate.middleware.js";
import { videoUploadSchema } from "./video.validation.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/",
  validateUser,
  validationMiddleware(videoUploadSchema),
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  
);

export default router;
