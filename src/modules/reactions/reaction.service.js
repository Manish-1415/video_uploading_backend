import ApiError from "../../utility/ApiError.js";
import { User } from "../auth/auth.model.js";
import { Video } from "../video/video.model.js";
import { Reaction } from "../reactions/reaction.model.js"

const reactionService = {
    createReactionEntry : async (userId , videoId , reaction) => {
        // find user & video first
        const findUser = await User.findById(userId);
        
        if(!findUser) throw new ApiError(404 , "User Not Found");

        const findVideo = await Video.findById(videoId);

        if(!findVideo) throw new ApiError(404 , "Video Not Found");

        // find if reactionExist or not on that video 
        let findReactionExist = await Reaction.findOne({videoId , userId});

        if(findReactionExist) {
            if(findReactionExist.reaction === reaction) {
                // if user old reaction & new reaction are similar then delete the reaction
                return await Reaction.findByIdAndDelete(findReactionExist._id , {new : true});
            }
            else {
                findReactionExist.reaction = reaction;

                return await findReactionExist.save();
            }
        }
        // if there is no reaction then this code will run
        else {
            //create a reaction 
            const createNewReaction = await Reaction.create({
                userId ,
                videoId ,
                reaction
            });

            if(!createNewReaction) throw new ApiError(500 , "Error Occurred while creating an Reaction");

            return {video : findVideo , reaction : createNewReaction};
        }
    },

    getReactionsOnAVideo : async (videoId) => {
        const findVideo = await Video.findById(videoId);

        if(!findVideo) throw new ApiError(404 , "Video Not Found");

        let findIfVidGotReactions = await Reaction.find({videoId});

        // if(!findIfVidGotReactions) throw new ApiError(404 , "Video Got No Reactions");
        // No need for this , even if 0 likes or 0 dislikes it will store in countLikes / countDislikes variables

        const countLikes = findIfVidGotReactions.filter( (reactionObj) => reactionObj.reaction === "like" ).length;
        const countDislikes = findIfVidGotReactions.filter( (reactionObj) => reactionObj.reaction === "dislike" ).length;

        return { video : findVideo , likes : countLikes , dislikes : countDislikes }
    }
};


export default reactionService;