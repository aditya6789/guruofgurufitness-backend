import Query from "../models/queryModel.js";

export const QueryController = async (req, res, next) => {
  const { full_name, email, moblie, your_city } = req.body;
  // validation
  try {
    if (!full_name || !email || !moblie || !your_city) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new Query
    const query = new Query({
      full_name,
      email,
      moblie,
      your_city,
    });

    // Save the new query to the database
    await query.save();

    res.status(201).json({ message: "Query registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
