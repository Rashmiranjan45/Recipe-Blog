import { Router } from "express";
import { uploads } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  logutUser,
  registerUser,
  signupUser,
  userLoggedIn,
} from "../controller/user.controller.js";

const router = Router();

router.route("/signup").get(signupUser);
router.route("/signup").post(uploads.single("avatar"), registerUser);
router.route("/login").get(loginUser);
router.route("/login").post(userLoggedIn);
router.route("/logout").get(logutUser);

export default router;
