import Landing from "../models/landingModel.js";
import Joi from "joi";

// Validation schema
const LandingSchema = Joi.object({
  video_link: Joi.string().required(),
  paragraph: Joi.string().required(),
  story_keypoints: Joi.array(),
  story_paragraph: Joi.string(),
  industury_keypoints: Joi.array(),
});

const LandingController = {
  async create(req, res, next) {
    // Check if a landing page already exists
    const existingLanding = await Landing.findOne();

    if (existingLanding) {
      return res.status(400).json({
        message: "A landing page already exists. Use update instead.",
      });
    }

    const {
      video_link,
      paragraph,
      story_keypoints,
      story_paragraph,
      industury_keypoints,
    } = req.body;

    // Validation
    const { error } = LandingSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // Create a new Landing
    const landing = new Landing({
      video_link,
      paragraph,
      story_keypoints,
      story_paragraph,
      industury_keypoints,
    });

    // Save the new landing to the database
    try {
      const result = await landing.save();
      res.status(201).json({ result });
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    const {
      video_link,
      paragraph,
      story_keypoints,
      story_paragraph,
      industury_keypoints,
    } = req.body;

    // Validation
    const { error } = LandingSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // Update the landing page in the database
    try {
      const existingLanding = await Landing.findOne();

      if (!existingLanding) {
        return res
          .status(404)
          .json({ message: "Landing page not found. Use create instead." });
      }

      const result = await Landing.findByIdAndUpdate(
        existingLanding._id,
        {
          video_link,
          paragraph,
          story_keypoints,
          story_paragraph,
          industury_keypoints,
        },
        { new: true }
      );

      res.json({ result });
    } catch (error) {
      return next(error);
    }
  },

  async get(req, res, next) {
    try {
      const landing = await Landing.find();

      res.json({ landing });
    } catch (error) {
      return next(error);
    }
  },
};

export default LandingController;
