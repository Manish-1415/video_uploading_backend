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


app.use("/api/v1/user" , userRouter);



// import err middleware at last 

import errorMiddleware from "./middlewares/err.middleware.js";
app.use(errorMiddleware);

export default app;