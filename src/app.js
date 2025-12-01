import express from "express";

const app = express();

import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cookieParser());

app.use(express.json());

app.use(express.static("public"));

app.use(express.urlencoded({extended : true}))

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true // allow sending cookies from client
}))


// import routers here

import userRouter from "./modules/user/user.route.js";
import authRouter from "./modules/auth/auth.route.js";
import videoRouter from "./modules/video/video.route.js";
import reactionRouter from "./modules/reactions/reaction.route.js";

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/auth" , authRouter);
app.use("/api/v1/video" , videoRouter);
app.use("/api/v1/reaction", reactionRouter);



// import err middleware at last 
import errorMiddleware from "./middlewares/err.middleware.js";
app.use(errorMiddleware);

export default app;