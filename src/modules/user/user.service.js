import ApiError from "../../utility/ApiError.js";
import { deleteFileFromCloudinary, uploadFileOnCloudinary } from "../../utility/cloudinary.js";
import {User} from "../auth/auth.model.js";

const userService = {
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
    },

    getUserEntry : async (userId) => {
        let findUserEntry = await User.findById(userId).select("-password -refreshToken");

        if(!findUserEntry) throw new ApiError(404 , "User Not Found");

        if(findUserEntry._id.toString() !== userId) throw new ApiError(400 , "User Cannt Perform this Operation");

        return findUserEntry;
    },

    generateNewPassword : async (userId , oldPassword , newPassword) => {
        // find user
        let findUserEntry = await User.findById(userId);

        if(!findUserEntry) throw new ApiError(404 , "User Not Found");

        if(findUserEntry._id.toString() !== userId) throw new ApiError(400 , "User Cannot Perform this Operation");

        const checkIfPassIsSame = await findUserEntry.comparePassword(oldPassword);

        if(!checkIfPassIsSame) throw new ApiError(400 , "Please Provide Correct Password");

        findUserEntry.password = "";
        findUserEntry.password = newPassword;

        await findUserEntry.save();

        return findUserEntry;
    }
}


export default userService;