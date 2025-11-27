import ApiResponse from "../../utility/ApiResponse.js";
import asyncHandler from "../../utility/asyncHandler.js";
import userService from "./user.service.js";

export const createUser = asyncHandler(async (req , res) => {
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


export const authUser = asyncHandler(async (req , res) => {
    const userInfoObj = req.body;

    let login = await userService.userLogin(userInfoObj);

    let { refreshToken , accessToken , user } = login;

    const resToSendClient = {
        id : user._id,
        fullname : user.fullname,
        email : user.email,
        role : user.password
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken ,
        {
            httpOnly : true,
            secure : false, 
            sameSite : "lax",
            maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
        }
    )
    .json(new ApiResponse(200 , "User Login Successful !", { accessToken , user : resToSendClient }));
})


