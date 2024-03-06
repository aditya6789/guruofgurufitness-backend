import express from "express";
import {
  LoginController,
  SignupController,
  getAllUsers,
} from "../controller/userController.js";

import QueryController from "../controller/queryController.js";
import CourseController from "../controller/courseController.js";

import auth from "../middleware/auth.js";
import LandingController from "../controller/landingController.js";

export const router = express.Router();

router.post("/signup", SignupController);
router.post("/login", auth, LoginController);
router.get("/users", getAllUsers);
router.post("/query", QueryController.create);
router.post("/course", CourseController.create);
router.put("/course", CourseController.update);
router.delete("/course", CourseController.delete);
router.get("/course", CourseController.get);

router.get("/landing", LandingController.get);
router.post("/landing", LandingController.create);
router.put("/landing", LandingController.update);
