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