import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";
import { REFRESH_SECERT } from "../config/index.js";
import Refresh from "../models/refresh.js";
// Import necessary modules and setup

export const SignupController = async (req, res, next) => {
  console.log(req.body);
  const registerSchema = Joi.object({
    full_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeat_password: Joi.ref("password"),
  });
  // console.log(req.body);
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  try {
    const exists = await User.exists({ email: req.body.email });
    // const customError = CustomErrorHandler.alreadyExist("Some error message");

    if (exists) {
      return next(
        CustomErrorHandler.alreadyExist("This Email is Already Taken !")
      );
    }
  } catch (error) {
    return next(error);
  }

  // hashed password

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    return next(error);
  }

  const { full_name, email, repeat_password } = req.body;

  const user = new User({
    full_name,
    email,
    password: hashedPassword,
    repeat_password,
  });
  let access_token;
  let refresh_token;
  try {
    const result = await user.save();

    //token
    access_token = JwtService.sign({ _id: result._id, role: result.role });
    refresh_token = JwtService.sign(
      { _id: result._id, role: result.role },
      "1y",
      REFRESH_SECERT
    );
    await Refresh.create({ token: refresh_token });
  } catch (error) {
    return next(error);
  }

  res.send({ user, access_token, refresh_token });
};

export const LoginController = async (req, res, next) => {
  console.log(req.body);
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  let access_token;
  let refresh_token;
  let user;

  try {
    user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(CustomErrorHandler.wrongCredentials());
    }
    // console.log(user)
    //compare the password
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    // token

    access_token = JwtService.sign({ _id: user._id, role: user.role });
    refresh_token = JwtService.sign(
      { _id: user._id, role: user.role },
      "1y",
      REFRESH_SECERT
    );
    await Refresh.create({ token: refresh_token });
  } catch (error) {
    return next(error);
  }
  res.send({
    access_token,
    refresh_token,
    role: user.role,
    email: user.email,
    full_name: user.full_name,
  });
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users);

    if (!users) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch users." });
    }

    // Return a proper response with the found users
    return res.status(200).json({ success: true, users: users });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
