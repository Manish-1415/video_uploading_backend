import ApiResponse from "../../utility/ApiResponse.js";
import asyncHandler from "../../utility/asyncHandler.js";
import userService from "./user.service.js";

export const updateUserInfo = asyncHandler(async (req , res) => {
    const file = req.file;
    const userInfoObj = req.body;
    const userId = req.user.id;

    const user = await userService.updateUser(file , userInfoObj , userId);

    const resToSendClient = {
        id : user._id,
        fullname : user.fullname,
        avatar : user.avatar,
        role : user.role,
        email : user.email,
    }

    return res
    .status(200)
    .json(new ApiResponse(200 , "User Updation Complete", resToSendClient));
})


export const getUser = asyncHandler(async (req , res) => {
    const userId = req.user.id;

    const user = await userService.getUserEntry(userId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "User Fetched Successfully!", user));
});


export const changePassword = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const {oldPassword , newPassword} = req.body;

    const updatePassword = await userService.generateNewPassword(userId , oldPassword , newPassword);

        const resToSendClient = {
        id : updatePassword._id,
        fullname : updatePassword.fullname,
        avatar : updatePassword.avatar,
        role : updatePassword.role,
        email : updatePassword.email,
    }

    return res
    .status(200)
    .json(new ApiResponse(200 , "Password Updated Successfully !", resToSendClient));

})