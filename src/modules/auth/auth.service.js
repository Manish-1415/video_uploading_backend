import ApiError from "../../utility/ApiError.js";
import { accessTokenCreation } from "../../utility/jwt.tokens.js";
import { User } from "./auth.model.js";

const authService = {
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
    },

    userLogin : async (userInfoObj) => {
        // check for users existence
        let findUserEntry = await User.findOne({email : userInfoObj.email});

        if(!findUserEntry) throw new ApiError(404 , "Registered the user first");

        let checkUserPassword = await findUserEntry.comparePassword(userInfoObj.password);

        if(!checkUserPassword) throw new ApiError(400 , "Please Provide Correct Password");

        // now password is checked , user is present now simply create access token & refresh token

        const accessPayload = {
            id : findUserEntry._id,
            fullname : findUserEntry.fullname,
            email : findUserEntry.email,
            role : findUserEntry.role
        }
        const accessToken = accessTokenCreation(accessPayload);


        const refreshPayload = {
            id : findUserEntry._id,
        }
        const refreshToken = refreshTokenCreation(refreshPayload);

        findUserEntry.refreshToken = refreshToken;

        const updatedUserEntry = await findUserEntry.save();

        if(!updatedUserEntry) throw new ApiError(500 , "Error Occurred while saving the entry in DB");

        return {
            refreshToken , 
            accessToken , 
            user : updatedUserEntry
        }
    },

    logOutUserEntry : async (userId) => {

        let checkForUserEntry = await User.findById(userId);

        if(!checkForUserEntry) throw new ApiError(404 , "User Not Found");

        // throw err when another login person try to delete another persons refresh token
        if(checkForUserEntry._id.toString() !== userId) throw new ApiError(400 , "You are Not authorized to perform this operation");

        // simply empty refresh token
        checkForUserEntry.refreshToken = "";

        await checkForUserEntry.save();

        return checkForUserEntry;
    },


    generateNewAccessToken : async (refreshToken) => {
        // check for user Entry
        let findUserEntry = await User.findById(refreshToken);

        if(!findUserEntry) throw new ApiError(404 , "User Not Found");

        // generate new token 

        if(findUserEntry._id.toString() !== refreshToken) throw new ApiError(400 , "You are not authorized to perform this operation");

        const accessToken = accessTokenCreation({
            id : findUserEntry._id,
            fullname : findUserEntry.fullname,
            email : findUserEntry.email,
            role : findUserEntry.role
        });

        return { user : findUserEntry , accessToken }
    }
}

export default authService;