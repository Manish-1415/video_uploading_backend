import mongoose from "mongoose";
import { nameOfDB } from "../constants/constants.js";

const connectionToDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${nameOfDB}`);

        if(connect) {
            console.log("DB connected with the server ⚙️ ⚙️ ⚙️");
        
            console.log("DB host ",connect.connection.host);
        }
    } catch (error) {
        console.log(error);
    }
}

export default connectionToDB;