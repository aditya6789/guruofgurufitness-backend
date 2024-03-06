import Course from "../models/courseModel.js";
import Joi from "joi";

// Validation schema
const CourseSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  about: Joi.string().required(),
  validity: Joi.string(),
  eligibility: Joi.string(),
  weekdays_batch: Joi.string(),
  weekends_batch: Joi.string(),
  course_details: Joi.string(),
});

// const isAdmin = (req, res, next) => {
//   // Assuming you have stored the user role during authentication
//   const userRole = req.user && req.user.role;

//   if (userRole !== "admin") {
//     return res.status(403).json({ message: "Unauthorized access" });
//   }

//   next();
// };

const CourseController = {
  async create(req, res, next) {
    try {
      // isAdmin(req, res, next);

      const {
        name,
        about,
        validity,
        eligibility,
        weekdays_batch,
        weekends_batch,
        course_details,
      } = req.body;

      // Validation
      const { error } = CourseSchema.validate(req.body);
      if (error) {
        return next(error);
      }

      // Create a new Course
      const course = new Course({
        name,
        about,
        validity,
        eligibility,
        weekdays_batch,
        weekends_batch,
        course_details,
      });

      // Save the new course to the database
      const result = await course.save();
      res.status(201).json({ result });
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      isAdmin(req, res, next);

      const courseId = req.params.id;
      const {
        name,
        about,
        validity,
        eligibility,
        weekdays_batch,
        weekends_batch,
        course_details,
      } = req.body;

      // Validation
      const { error } = CourseSchema.validate(req.body);
      if (error) {
        return next(error);
      }

      // Update the course in the database
      const result = await Course.findByIdAndUpdate(
        courseId,
        {
          name,
          about,
          validity,
          eligibility,
          weekdays_batch,
          weekends_batch,
          course_details,
        },
        { new: true }
      );

      if (!result) {
        return res.status(404).json({ message: "Course not found." });
      }

      res.json({ result });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    try {
      isAdmin(req, res, next);

      const courseId = req.params.id;

      // Delete the course from the database
      const result = await Course.findByIdAndDelete(courseId);

      if (!result) {
        return res.status(404).json({ message: "Course not found." });
      }

      res.json({ message: "Course deleted successfully." });
    } catch (error) {
      return next(error);
    }
  },

  async get(req, res, next) {
    try {
      const courses = await Course.find();
      if (courses.length === 0) {
        return res.status(404).json({ message: "No courses found." });
      }
      res.json({ courses });
    } catch (error) {
      return next(error);
    }
  },
};

export default CourseController;
