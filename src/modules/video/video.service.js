import ApiError from "../../utility/ApiError.js";
import { User } from "../auth/auth.model.js"
import {uploadFileOnCloudinary} from "../../utility/cloudinary.js";
import { Video } from "./video.model.js";

const videoService = {
    uploadVideoEntry : async (userId , files , videoData) => {
        // find the user first if there & validate him
        const findUserEntry = await User.findById(userId);

        if(!findUserEntry) throw new ApiError(404 , "User Not Found");

        if(findUserEntry._id.toString() !== userId) throw new ApiError(400 , "User Cannot Perform this Operation");

        if(!files || files.videoFile.length === 0) {
            throw new ApiError(400 , "Video File is Missing");
        }

        if(!files || files.thumbnail.length === 0) {
            throw new ApiError(400 , "Thumbnail File is Missing");
        }


        if(!files.videoFile[0].path || !files.thumbnail[0].path) {
            throw new ApiError(400 , "File Path is not provided");
        }

        // if everything is there now simply upload files properly 
        const uploadVideoFile = await uploadFileOnCloudinary(files.videoFile[0].path);

        if(!uploadVideoFile) throw new ApiError(500 , "Error Occurred while uploading videoFile");

        const uploadThumbnailFile = await uploadFileOnCloudinary(files.thumbnail[0].path);

        if(!uploadThumbnailFile) throw new ApiError(500 , "Error Occurred while uploading thumbnail");

        const tagsCheck = videoData.tags? videoData.tags.trim().split(" ") : []; // it will cover the empty tags case also.

        const videoObj = {
            title : videoData.title,
            description : videoData.description,
            videoFile : {
                public_id : uploadVideoFile.public_id,
                url : uploadVideoFile.url,
            },
            thumbnail : {
                public_id : uploadThumbnailFile.public_id,
                url : uploadThumbnailFile.url,
            },
            duration : uploadVideoFile.duration,
            owner : findUserEntry._id,
            // Here we will writing the logic of views when half of the project will be done
            tags : tagsCheck.length >=1 ? tagsCheck : [],
        }

        const createVideoEntry = await Video.create(videoObj);

        if(!createVideoEntry) throw new ApiError(500 , "Error Occurred while creating user entry");

        return createVideoEntry;

    }
}

export default videoService;