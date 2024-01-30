import express from "express";
import { LoginController, SignupController } from "../controller/userController.js";
import { QueryController } from "../controller/queryController.js";

 export const router = express.Router();

router.post('/signup' , SignupController);
router.post('/login' , LoginController);
router.post('/query',QueryController)
