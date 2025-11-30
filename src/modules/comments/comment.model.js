import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    videoId : {
        type : mongoose.Schema.ObjectId,
        ref : "Video",
    },

    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
    },

    comment : {
        type : String ,
    },
},
{ timestamps : true }
)

export const Comment = mongoose.model("Comment", commentSchema);