import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.ObjectId,
            ref : "User",
        },

        videoId : {
            type : mongoose.Schema.ObjectId,
            ref : "Video",
        },

        reaction : {
            type : String,
            enum : ["like" , "dislike"],        //why not separate is because a user can do only 1 thing like or dislike thats why we use this enum.
        }
    },

    { timestamps : true }
);


export const Reaction = mongoose.model("Reaction" , reactionSchema);