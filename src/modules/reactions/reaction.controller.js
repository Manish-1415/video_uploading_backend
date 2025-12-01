import ApiResponse from "../../utility/ApiResponse"
import asyncHandler from "../../utility/asyncHandler"
import reactionService from "./reaction.service";

export const createReaction = asyncHandler(async (req , res) => {
    const videoId = req.params.id;
    const reaction = req.body.reaction;

    const videoReaction = await reactionService.generateReaction(videoId , reaction , req.user.id);

    return res
    .status(201)
    .json(new ApiResponse(201 , "Reaction Generated "))
})