import ApiError from "../../utility/ApiError";
import {User} from "./user.model.js"

const userService = {
    createUserEntry : async (userInfoObj) => {
        // check for users existence 
        const checkUserEntry = await User.findOne({email : userInfoObj.email});

        if(checkUserEntry) throw new ApiError(405 , "User is already registered");

        const userCreation = {
            fullname : userInfoObj.fullname,
            email : userInfoObj.email,
            password : userInfoObj.password,
            role : userInfoObj.role
        }

        const user = await User.create(userCreation);

        if(!user) throw new ApiError(500 , "Error Occurred while registering the user");

        return user;
    }
}


export default userService;