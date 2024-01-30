import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
// Import necessary modules and setup

export const SignupController = async (req, res, next) => {
  console.log(req.body);
  const { full_name, email, password, repeat_password } = req.body;

  try {
    if (!full_name || !email || !password || !repeat_password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== repeat_password) {
      return res
        .status(400)
        .json({ message: "Password and repeat password do not match." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      full_name,
      email,
      password: hashedPassword,
      repeat_password,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const LoginController = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(400).json({ message: "User Doesn't Exist!" });
      }
  
      // Hash the password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password!" });
      }
  
      // Password is valid, proceed with login
      res.status(200).json({ message: "User logged in successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };