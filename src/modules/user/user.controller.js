import ApiResponse from "../../utility/ApiResponse.js";
import asyncHandler from "../../utility/asyncHandler.js";
import userService from "./user.service.js";

const createUser = asyncHandler(async (req , res) => {
    let userInfoObj = req.body;

    const user = await userService.createUserEntry(userInfoObj);

    const userObjToSendClient = {
        id : user._id,
        fullname : user.fullname,
        email : user.email,
        role : user.role
    }

    return res
    .status(201)
    .json(new ApiResponse(201 , "User Registered Successfully !", userObjToSendClient));
});

export default createUser;