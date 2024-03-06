import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  about: {
    type: String,

    required: true,
  },
  validity: {
    type: String,
    required: true,
    default: "1 year",
  },
  eligibility: {
    type: String,
    required: true,
  },
  weekdays_batch: {
    type: String,
    required: true,
    maxlength: 10,
  },
  weekends_batch: {
    type: String,
    maxlength: 10,

    required: true,
  },
  course_details: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Course", CourseSchema);
