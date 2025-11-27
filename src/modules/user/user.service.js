import ApiError from "../../utility/ApiError";
import { deleteFileFromCloudinary, uploadFileOnCloudinary } from "../../utility/cloudinary.js";
import { accessTokenCreation, refreshTokenCreation } from "../../utility/jwt.tokens.js";
// import { accessTokenCreation } from "../../utility/jwt.tokens.js";
import {User} from "./user.model.js"
import jwt from "jsonwebtoken";

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

    updateUser : async (file , userInfoObj , userId) => {
        let findUserEntry = await User.findOne({email : userInfoObj.email});

        if(!findUserEntry) throw new ApiError(404 , "Please register the user first");

        if(findUserEntry._id.toString() !== userId.toString()) throw new ApiError(404 , "User is not authorized to perform this task");
        
        if(!file) {
            let findUserAndUpdate = await User.findByIdAndUpdate(userId , userInfoObj);

            if(!findUserAndUpdate) throw new ApiError(500 , "Error Occurred while updating user");

            return findUserAndUpdate;
        }

        else {
            // this else block will cover both scenario means if file already there then simply delete the file

            // it means we have file we need to upload it on cloudinary
            if(findUserEntry.avatar.public_id && findUserEntry.avatar.url) {
                // delete the file then upload new file
                const deleteFile = await deleteFileFromCloudinary(file.path);

                if(!deleteFile) throw new ApiError(500 , "Error Occurred while deleting the file");

                findUserEntry.avatar.public_id = "";
                findUserEntry.avatar.url = "";
            }
                const uploadFile = await uploadFileOnCloudinary(file.path);

                if(!uploadFile) throw new ApiError(500 , "Error Occurred while uploading the file");

                findUserEntry.avatar.public_id = uploadFile.public_id;
                findUserEntry.avatar.url = uploadFile.url;

                await findUserEntry.save();

                return findUserEntry;
        }
    }
}


export default userService;