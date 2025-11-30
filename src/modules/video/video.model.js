import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    videoFile: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },

    thumbnail: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },

    duration: {
      type: Number, // in seconds (calculate after upload)
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    tags: {
      type: [String],
      default: [],
    },
  },

  { timestamps: true }
  
);

export const Video = mongoose.model("Video", videoSchema);
