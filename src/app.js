import express from "express";

const app = express();

import cookieParser from "cookie-parser";

app.use(cookieParser());

app.use(express.json());

app.use(express.static());

app.use(express.urlencoded({extended : true}))









export default app;