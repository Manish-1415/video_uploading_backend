import { Router } from "express";
import validateUser from "../../middlewares/verifyUser.middleware";
import { subscribedChannels, subscribeUser } from "./subscription.controller";

const router = Router();

router.post("/:id", validateUser , subscribeUser);

router.get("/subscribed_channels", validateUser , subscribedChannels);

router.get("/subscriber_counts/:id", validateUser , )

export default router;