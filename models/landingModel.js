import mongoose, { Schema } from "mongoose";

const LandingSchema = new Schema({
  video_link: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,

    required: true,
  },
  story_keypoints: {
    type: [String],
    required: true,
  },
  story_paragraph: {
    type: String,
    required: true,
  },
  industury_keypoints: {
    type: [String],
    required: true,
  },
});

export default mongoose.model("Landing", LandingSchema);
