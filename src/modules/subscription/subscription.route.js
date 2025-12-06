import { Router } from "express";
import validateUser from "../../middlewares/verifyUser.middleware";
import { subscribeUser } from "./subscription.controller";

const router = Router();

router.post("/:id", validateUser , subscribeUser);

export default router;