import Query from "../models/queryModel.js";
import Joi from "joi";

// Validation schema
const QuerySchema = Joi.object({
  full_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  your_city: Joi.string().required(),
});

const QueryController = {
  async create(req, res, next) {
    const { full_name, email, mobile, your_city } = req.body;

    // Validation
    const { error } = QuerySchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // Create a new Query
    const query = new Query({
      full_name,
      email,
      mobile,
      your_city,
    });

    // Save the new query to the database
    try {
      await query.save();
      res.status(201).json({ message: "Query registered successfully!" });
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    const queryId = req.params.id;
    const { full_name, email, mobile, your_city } = req.body;

    // Validation
    const { error } = QuerySchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // Update the query in the database
    try {
      const result = await Query.findByIdAndUpdate(
        queryId,
        { full_name, email, mobile, your_city },
        { new: true }
      );

      if (!result) {
        return res.status(404).json({ message: "Query not found." });
      }

      res.json({ result });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    const queryId = req.params.id;

    // Delete the query from the database
    try {
      const result = await Query.findByIdAndDelete(queryId);

      if (!result) {
        return res.status(404).json({ message: "Query not found." });
      }

      res.json({ message: "Query deleted successfully." });
    } catch (error) {
      return next(error);
    }
  },

  async get(req, res, next) {
    try {
      const queries = await Query.find();
      if (queries.length === 0) {
        return res.status(404).json({ message: "No queries found." });
      }
      res.json({ queries });
    } catch (error) {
      return next(error);
    }
  },
};

export default QueryController;
