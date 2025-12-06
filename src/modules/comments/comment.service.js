import ApiError from "../../utility/ApiError";
import { User } from "../auth/auth.model";
import { Video } from "../video/video.model";
import {Comment} from "./comment.model";

//No need for extra user existence checking but i did because of security reasons

const commentService = {
    createCommentEntry : async (videoId , userId , comment) => {
        //find user
        const findUser = await User.findById(userId);

        if(!findUser) throw new ApiError(404 , "User Not Found");
        // find vid
        const findVideo = await Video.findById(videoId);
        
        if(!findVideo) throw new ApiError(404 , "Video Not Found");

        const createComment = await Comment.create({
            videoId,
            userId,
            comment
        });

        if(!createComment) throw new ApiError(404 , "Error Occurred while creating comment");

        return createComment;
    },

    updateCommentEntry : async (commentId , userId , comment) => {
        const findUser = await User.findById(userId);

        if(!findUser) throw new ApiError(404 , "User Not Found");

        let findAndUpdateCmt = await Comment.findByIdAndUpdate(commentId , {comment});

        if(!findAndUpdateCmt) throw new ApiError(500 , "Error Occurred While Deleting the Comment");

        return findAndUpdateCmt;
    },

    deleteCommentEntry : async (commentId , userId) => {
        const findUser = await User.findById(userId);

        if(!findUser) throw new ApiError(404 , "User Not Found");

        // find the comment to delete 

        const findComment = await Comment.findById(commentId);
        
        if(!findComment) throw new ApiError(404 , "Comment Not Found to delete");

        if(findComment.userId.toString() === userId) {
            // if comment is created by this user then only del it.

            const findAndDelComment = await Comment.findByIdAndDelete(commentId);

            if(findAndDelComment) throw new ApiError(500 , "Error Occurred while deleting the comment");

            return findAndDelComment;
        }
        else {
            throw new ApiError(400 , "User is Not Authorized for this Operation");
        }
    },
}

export default commentService;