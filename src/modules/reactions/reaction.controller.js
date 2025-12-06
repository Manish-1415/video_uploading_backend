import ApiResponse from "../../utility/ApiResponse.js";
import asyncHandler from "../../utility/asyncHandler.js";
import reactionService from "../reactions/reaction.service.js";

export const createReaction = asyncHandler(async (req , res) => {
    const userId = req.user.id;
    const videoId = req.params.id;
    const reactionByUser = req.body;

    const reaction = await reactionService.createReactionEntry(userId , videoId , reactionByUser);

    return res
    .status(201)
    .json(new ApiResponse(201 , "Reaction Created/Updated/Deleted", reaction));
});


export const getReactionOnVid = asyncHandler(async (req , res) => {
    const videoId = req.params.id;

    const reactions = await reactionService.getReactionsOnAVideo(videoId);

    return res
    .status(200)
    .json(new ApiResponse(200 , "Reactions Fetched" , reactions));
})