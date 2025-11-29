import authService from "./auth.service.js";
import ApiResponse from "../../utility/ApiResponse.js";
import asyncHandler from "../../utility/asyncHandler.js"

export const createUser = asyncHandler(async (req , res) => {
    let userInfoObj = req.body;

    const user = await authService.createUserEntry(userInfoObj);

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

    let login = await authService.userLogin(userInfoObj);

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


export const logOutUser = asyncHandler(async (req , res) => {
    const userId = req.user.id;

    const user = await authService.logOutUserEntry(userId);

    const resToSendClient = {
        id : user._id,
        fullname : user.fullname,
        email : user.email,
        role : user.role,
    }

    return res
    .status(200)
    .clearCookie("refreshToken", {
        httpOnly : true,
        secure : false, 
        sameSite : "lax",
    })
    .json(new ApiResponse(200 , "User LoggedOut Successful !", resToSendClient));
})


export const newAccessToken = asyncHandler(async (req , res) => {
    const refreshToken = req.refToken;

    const user = await authService.generateNewAccessToken(refreshToken);

    const resToSendClient = {
        id : user.user._id,
        fullname : user.user.fullname,
        email : user.user.email,
        role : user.user.role,
    }

    return res
    .status(200)
    .json(new ApiResponse(200 , "Access Token Generated Successfully!", { user : resToSendClient , accessToken : user.accessToken }));
});