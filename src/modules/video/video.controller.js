import asyncHandler from "../../utility/asyncHandler.js"
import videoService from "./video.service.js";
import ApiResponse from "../../utility/ApiResponse.js";

export const uploadVideo = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const files = req.files;
    const videoData = req.body;

    const video = await videoService.uploadVideoEntry(userId , files , videoData);

    return res
    .status(201)
    .json(new ApiResponse(201 , "Video Uploaded SuccessFully on Our Platform", video));
})