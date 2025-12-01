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


export const getSpecificVideo = asyncHandler(async (req , res) => {
    const vidId = req.params.vid_id;

    const video = await videoService.fetchSingleVideo(vidId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Video Fetched Successfully !", video));
});


export const getVideos = asyncHandler(async (req , res) => {
    const videos = await videoService.fetchAllVideos();

    return res
    .status(200)
    .json(new ApiResponse(200 , "Videos Fetched Successfully !", videos));
});


export const increaseViews = asyncHandler(async (req , res) => {
    const videoId = req.params.id;

    const video = await videoService.updateViews(videoId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Views Updated Successfully !", video));
})