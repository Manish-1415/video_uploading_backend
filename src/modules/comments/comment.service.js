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

    updateCommentEntry : async (videoId , userId , comment) => {
        const findUser = await User.findById(userId);

        if(!findUser) throw new ApiError(404 , "User Not Found")
    }
}

export default commentService;