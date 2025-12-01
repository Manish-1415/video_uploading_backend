import ApiError from "../../utility/ApiError";
import { Video } from "../video/video.model";
import { User } from "../auth/auth.model";
import { Reaction } from "./reaction.model";

const reactionService = {
    generateReaction : async (videoId , reaction , userId) => {
        let findVideo = await Video.findById(videoId);

        if(!findVideo) throw new ApiError(404 , "Video Not Found");

        let findUser = await User.findById(userId);

        if(!findUser) throw new ApiError(404, "User Not Found");

        let findIfReactionExist = await Reaction.findOne({userId , videoId});

        if(findIfReactionExist) {
            findIfReactionExist.reaction === "dislike" ? "like" : "dislike";

            await findIfReactionExist.save();

            return findIfReactionExist;
        }

        const newReactionModel = {
            userId ,
            videoId , 
            reaction
        }

        const reactionModel = await Reaction.create(newReactionModel);

        if(!reactionModel) throw new ApiError(500 , "Error Occurred while generating the reaction");

        return reactionModel;
    }
}

export default reactionService;