import ApiResponse from "../../utility/ApiResponse";
import asyncHandler from "../../utility/asyncHandler";
import commentService from "./comment.service";


export const createComment = asyncHandler(async (req , res) => {
    const videoId = req.params.vid_id;
    const userId = req.user.id;
    const commentByUser = req.body;

    const comment = await commentService.createCommentEntry(videoId , userId , commentByUser);

    return res
    .status(201)
    .json(new ApiResponse(201 , "Comment Is Created", comment));
})



export const updateComment = asyncHandler(async (req , res) => {
    const videoId = req.params.vid_id;
    const userId = req.user.id;
    const commentByUser = req.body;

    const comment = await commentService.updateCommentEntry(videoId , userId , commentByUser);
});