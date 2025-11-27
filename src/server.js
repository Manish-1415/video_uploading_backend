import dotenv from "dotenv"
dotenv.config({path : "./.env"});

import app from "./app.js";
import connectionToDB from "./DB/connectDB.js";

const port = process.env.PORT || 8080;

connectionToDB()
.then( () => {
    app.listen(port , () => console.log(`Server is running on port ${port}`));
} )